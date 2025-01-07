/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Play Classic DOS Games Online - Retro Gaming Hub`,
    siteUrl: `https://weplaydos.games`,
    image: `/logo.gif`,
    keywords: `weplaydos, play dos games, dos games, Classic DOS games, retro gaming, browser-based DOS games, DOS game collection, vintage computer games, old school PC games, 90s DOS games, free DOS games, weplaydos.games, MS-DOS games, online retro games, DOS emulation, play old games online`,
    description: `Play DOS games online at WePlayDOS. Enjoy a vast collection of classic DOS games in your browser and relive the golden era of retro gaming.`,
    icon: `/logo.gif`,
  },
  trailingSlash: 'always',
  plugins: [
    // "gatsby-plugin-google-gtag"
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    // "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/online/*/play/'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/logo.gif"
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/",
        ignore: [
          `**/\.*`, // Ignore hidden files
          `**/*_*`, // Ignore files with an underscore in their names
        ],
      },
      __key: "images"
    },
    {
      resolve: `gatsby-plugin-mdx`,
      // options: {
      //   gatsbyRemarkPlugins: [
      //     {
      //       resolve: `gatsby-remark-images`,
      //       options: {
      //         loading: 'lazy',
      //         withWebp: true,
      //       },
      //     },
      //   ],
      // },
    }
  ]
};