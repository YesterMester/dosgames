import React, { useEffect, useState } from 'react';
import { FlexGrid, Tile, Column, Row, Heading, Grid, AspectRatio, Button, Section, Tag, InlineNotification } from '@carbon/react';
import RootLayout from '../components/layout';
import { graphql, Link } from 'gatsby';
import GameCategoryViewerComponent from '../components/game-category-viewer/game-category-viewer';
import { Categories, GameConsole } from '@carbon/icons-react';
import { SEO as Seo } from '../components/seo';
import ShareButtons from '../components/social-share/social-share';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import GameScreenshots from '../components/game-screenshots/game-screenshots';
import { generateSlug } from '../utils/helpers';
import BreadcrumbComponent from '../components/bread-crumb/bread-crumb';
import { isGamePresentInDB } from '../components/game-player/game-player';

function convertMarkdownToHTML(content, title) {
  // Convert headers
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert paragraphs
  content = content.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return '<p>' + m + '</p>';
  });

  // Convert bullet points
  content = content.replace(/^\s*\-\s(.+)/gm, '<ul><li>$1</li></ul>');

  // Handle optional sections (optional)
  content = content.replace(/\(Optional\)/g, '<span class="optional">(Optional)</span>');

  // Replace consecutive <ul> tags with a single <ul> tag, due to the way lists are created in the previous step
  content = content.replace(/<\/ul>\s*<ul>/g, '');

  // Add <br> for single line breaks not part of a paragraph or list
  // This step should be done after handling paragraphs to avoid inserting <br> inside <p> tags
  content = content.replace(/(?<!<\/p>|<\/li>)\n/g, '<br>');

  content = content.replace(/weplayDOS\.games/gi, '<a href="http://weplayDOS.games">weplayDOS.games</a>');

  content = content.replace(/conclusion/gi, `Play ${title} online`);

  return content;
}

export const query = graphql`
  query($slug: String!, $mainImage: String!) {
    games(slug: { eq: $slug }) {
      game_id
      title
      content
      category
      year
      publisher
      developer
      screenshots
      meta_description
      keywords
      mainImage
      htmlContent
    }
    file(relativePath: { eq: $mainImage }) {
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [ WEBP]
        )
      }
    }
  }
`

const ProductPage = ({ data, pageContext }) => {
  const game = data.games;
  const gameCategory = game.category;
  const categoryPath = `/${generateSlug(gameCategory)}-games/`;
  const [url, setUrl] = useState('');
  const mainImage = getImage(data.file.childImageSharp.gatsbyImageData); // Get the image data
  const [isGameSaved, setIsGameSaved] = useState(false);

  const breads = [{ name: `${game.category} games`, url: categoryPath }, { name: game.title, url: '/online/' + pageContext.slug }];
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    isGamePresentInDB(game.game_id).then((result) => {
      setIsGameSaved(result);
    })
  }, [game]);

  return (
    <RootLayout>
      <Tile
      // style={{maxHeight:'110vh'}}
      >
        <BreadcrumbComponent items={breads}></BreadcrumbComponent>
        <FlexGrid>
          <Row>
            <Column lg={6}>
              <AspectRatio ratio="16x9" as='div'>
                <GatsbyImage image={mainImage} alt={game.title} />
              </AspectRatio>
              <center>
                <Link to='play/'>
                  <Button as={"div"}
                    type='button'
                    isExpressive={true}
                    iconDescription='Play game now!'
                    renderIcon={GameConsole}
                    // kind='secondary'
                    className='game-play-button'
                    size='lg'
                  // onClick={goToGamePage}
                  >
                    Play game now!</Button>
                </Link>
                {isGameSaved &&
                  <center>
                    <InlineNotification className="game-saved-notification" kind="info" title="Saved game found" subtitle="Your previously saved progress will load when the game starts. Keep Playing!"></InlineNotification>
                  </center>
                }

                <ShareButtons url={url} title={game.title} />
              </center>

              <Grid condensed className='game-info-grid'>
                <Column lg={16}>
                  <center>
                    <Section level={3}>
                      <Link to={categoryPath}>
                        <Tag renderIcon={Categories} size="lg" type="cool-gray"> {gameCategory} games </Tag>
                      </Link>
                    </Section>
                  </center>
                </Column>
                <Column lg={4}>
                  <h5>Year</h5>
                  <p>
                    {game.year}
                  </p>
                </Column>
                <Column lg={12}>
                  <h5>Publisher</h5>
                  <p>
                    {game.publisher}
                  </p>
                </Column>
                <Column lg={12}>
                  <h5>Developer</h5>
                  <p>
                    {game.developer}
                  </p>
                </Column>
              </Grid>

            </Column>
            <Column lg={10}>
              {game.content && !game.htmlContent && <p className='game-content-p' dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(game.content, game.title) }}></p>}
              <div className='product-page'>

                {game.htmlContent && <div className='product-page-content' dangerouslySetInnerHTML={{ __html: game.htmlContent }}></div>}
              </div>


            </Column>
          </Row>

          <Row>
            <Column lg={16}>
              <GameCategoryViewerComponent isRelated={true} count={12} heading={game.category} gameCategory={game.category}></GameCategoryViewerComponent>
            </Column>
          </Row>
        </FlexGrid>
      </Tile>
    </RootLayout>
  );
};



export default ProductPage;

export const Head = ({ data, pageContext }) => {
  const game = data.games;
  return (
    <>
      <Seo seo_title={`Play ${game.title} - ${game.category} Game Online | WePlayDOS`} seo_desc={game.meta_description} seo_keywords={game.keywords} seo_image={`/images/${game.game_id}.jpeg`} pathname={`online/${pageContext.slug}`}></Seo>
    </>
  );
}

