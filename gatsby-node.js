const fs = require('fs');
const path = require('path');
const lunr = require('lunr');

const generateSlug = (text) => {
  return text.toLowerCase()
    .normalize('NFD') // Normalize to decompose special characters into their composing characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Replace multiple - with single -
}


function createInternalLinks(data) {
  const filter_keywords = require('./src/data/filter_keywords.json');
  const keywordToSlug = {};
  // const gameK = {};

  // Create a mapping of keywords to slugs
  data.forEach(game => {
    const keywords = game.keywords.split(',').map(keyword => {
      // Trim whitespace and remove surrounding quotes
      return keyword.trim().replace(/^['"]|['"]$/g, '').toLowerCase();
    });

    // gameK[game.slug] = keywords;
    keywords.forEach(keyword => {
      keywordToSlug[keyword] = game.slug;
    });
  });

  data.forEach(game => {
    let content = game.content.split('\n').map(line => {
      // Skip replacement if the line is a heading
      if (/^#+\s/.test(line)) {
        return line;
      }
      Object.keys(keywordToSlug).forEach(keyword => {
        if (!filter_keywords.includes(keyword)) {
          const slug = keywordToSlug[keyword];
          // Skip replacement if the current game's slug matches the keyword's slug
          if (game.slug === slug) {
            return;
          }
          // Use negative lookbehind and lookahead to ensure whole word match
          const regex = new RegExp(`(?<!\\w)${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\w)(?![^<]*>)`, 'gi');
          line = line.replace(regex, match => {
            return `<a href='/games/${slug}'>${match}</a>`;
          });
        }

      });
      return line;
    }).join('\n');
    game.content = content;
  });

  // Log the keywordToSlug object with consistent single quotes
  // console.log('keywordToSlug', JSON.stringify(keywordToSlug, null, 2).replace(/"([^"]+)":/g, "'$1':"));

  return data;
}

const parseTitle = (title) => {
  return title
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


exports.sourceNodes = async ({ actions: { createNode, createPage }, createNodeId, createContentDigest, graphql }) => {


  const slugHtmlMap = new Map();
  const gameContentDir = path.resolve(__dirname, 'src/gamecontent');
  const gameFiles = fs.readdirSync(gameContentDir);

  gameFiles.forEach(file => {
    if (path.extname(file) === '.html') {
      const content = fs.readFileSync(path.join(gameContentDir, file), 'utf-8');
      slugHtmlMap.set(path.basename(file, '.html'), content);
    }
  });

  const categoryContentDir = path.resolve(__dirname, 'src/categorycontent');
  const categoryFiles = fs.readdirSync(categoryContentDir);
  categoryFiles.forEach(file => {
    if (path.extname(file) === '.html') {
      const content = fs.readFileSync(path.join(categoryContentDir, file), 'utf-8');
      slugHtmlMap.set(path.basename(file, '.html'), content);
    }
  });

  const data = require('./src/data/games_v1.json');

  // createInternalLinks(data);
  const years = new Set();
  const developers = new Set();
  const publishers = new Set();
  const categories = new Set();
  const sagas = new Set();

  let _index = 1;
  for (let game of data) {
    const slug = generateSlug(game.title);
    const screeshots = [];
    const mainImage = game.game_id + '.jpeg';

    if (slugHtmlMap.has(slug)) {
      game.htmlContent = slugHtmlMap.get(slug);
    }
    game.mainImage = mainImage;
    if (game.saga) {
      sagas.add(game.saga);
    }

    for (let i = 0; i < game.imagesLen; i++) {
      screeshots.push(game.game_id + '_' + [i] + '.jpeg');
    }
    game.screenshots = screeshots;

    years.add(game.year);
    developers.add(game.developer);
    publishers.add(game.publisher);
    categories.add(game.category);
    const nodeObj = {
      ...game,
      slug,
      id: createNodeId('game-' + slug),
      internal: {
        type: 'games',
        contentDigest: createContentDigest(game),
      },
      frontmatter: {
        title: game.title,
        description: game.content,
      },
      index: '999' + _index++,
    };
    createNode(nodeObj);


  }


  const index = lunr(function () {
    this.ref('game_id');
    this.field('title');
    this.field('content');
    this.field('slug');

    data.forEach((game) => {
      this.add(game);
    });
  });

  // Write the index to a JSON file
  const outputPath = path.resolve(__dirname, 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index));
  const filterAndCreateNodeByParam = (param, values) => {
    for (let value of values) {
      const slug = generateSlug(value);
      const games = data.filter(game => game[param] === param);
      let htmlContent = undefined;
      // console.log('slug', slug);
      if (param == "category" && slugHtmlMap.has(slug + '-games')) {
        // console.log('slugHtmlMap', slugHtmlMap.get(slug + '-games'));
        htmlContent = slugHtmlMap.get(slug + '-games');
      }

      const nodeObj = {
        slug,
        title: value,
        id: createNodeId('param-' + slug),
        games: games.map(game => game.game_id),
        htmlContent,
        internal: {
          type: param,
          contentDigest: createContentDigest(slug),
        },
        frontmatter: {
          title: value,
        },
      };
      createNode(nodeObj);
    }
  }




  // filterAndCreatePagesByParam('year', years);
  // filterAndCreatePagesByParam('developers', developers);
  // filterAndCreatePagesByParam('publishers', publishers);
  filterAndCreateNodeByParam('category', categories);
  filterAndCreateNodeByParam('saga', sagas);

}

exports.createPages = async ({ actions: { createPage, createNode }, createNodeId, createContentDigest, graphql }) => {
  const productContentDir = path.resolve(__dirname, 'src/productcontent');
  const productFiles = fs.readdirSync(productContentDir);
  productFiles.forEach(file => {
    if (path.extname(file) === '.html') {
      const content = fs.readFileSync(path.join(productContentDir, file), 'utf-8');
      const rawTitle = path.basename(file, '.html');
      const formattedTitle = parseTitle(rawTitle);
      // console.log('content', content);
      createPage({
        path: `/products/${path.basename(file, '.html')}`,
        component: require.resolve("./src/templates/product-page.js"),
        context: {
          title: formattedTitle,
          htmlContent: content,
          frontmatter: {
            title: formattedTitle,
            slug: path.basename(file, '.html'),
          },
        },
      })
    }
  });


  /**
   * Create game pages
   */
  const allGames = await graphql(`
        {
          allGames {
            nodes {
              slug
              title
              mainImage
            }
          }
        }
      `);

  allGames.data.allGames.nodes.forEach(node => {
    if (node.slug) {
      const game = node;
      createPage({
        path: `/online/${game.slug}/`,
        component: require.resolve("./src/templates/game-page.js"),
        context: {
          slug: game.slug,
          title: game.title,
          mainImage: `games/${game.mainImage}`,
          frontmatter: {
            title: game.title,
            //   description: game.og_description,
          },
        },
      });

      createPage({
        path: `/online/${game.slug}/play/`,
        component: require.resolve("./src/templates/play-game-page.js"),
        context: {
          slug: game.slug,
          title: game.title,
          frontmatter: {
            title: game.title,
            //   description: game.og_description,
          },
        },
      })
    } else {
      console.log("Empty slug", node);
    }
  })


  /**
  * Create category pages
  */

  const allCategories = await graphql(`
        {
          allCategory {
            nodes {
              slug
              title
              htmlContent
            }
          }
        }
      `);

  allCategories.data.allCategory.nodes.forEach(node => {
    if (node.slug) {
      const category = node;
      createPage({
        path: `/${category.slug}-games`,
        component: require.resolve("./src/templates/game-category-page.js"),
        context: {
          slug: category.slug,
          title: category.title,
          htmlContent: category.htmlContent,
          frontmatter: {
            title: category.title,
            //   description: category.og_description,
          },
        },
      })
    }
  })

  /**
  * Create saga pages
  */

  const allSagas = await graphql(`
        {
          allSaga {
            nodes {
              slug
              title
            }
          }
        }
      `);

  allSagas.data.allSaga.nodes.forEach(node => {
    if (node.slug) {
      const saga = node;
      createPage({
        path: `/game-saga/${saga.slug}-saga/`,
        component: require.resolve("./src/templates/game-saga-page.js"),
        context: {
          slug: saga.slug,
          title: saga.title,
          frontmatter: {
            title: saga.title
          },
        },
      })
    }
  })

}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/fonts/',
                publicPath: '/fonts/', // Adjust this path based on your project structure
              },
            },
          ],
        },
      ],
    },
  });
};


