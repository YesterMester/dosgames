import React, { } from 'react';
import { AspectRatio, Column } from '@carbon/react';
import './game-col.css';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';


export const GameCol = ({ game, index }) => {
  const data = useStaticQuery(graphql`
        query {
          allFile(filter: { relativePath: { regex: "/games/" } }) {
            edges {
              node {
                relativePath
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [ WEBP]
                    )
                }
              }
            }
          }
        }
      `);

  // Find the image that matches the game's mainImage path
  const imageNode = data.allFile.edges.find(edge => edge.node.relativePath.includes(game.mainImage));
  const image = getImage(imageNode.node.childImageSharp.gatsbyImageData);
  // const { width, height } = image.images.fallback;
  return (
    <Column key={index}
      lg={2} md={2} sm={4} xs={12}
      className='category-page-col'
    >

      <Link
        key={index}
        className='gatsby-link'
        to={`/online/${game.slug}/`}
        style={{ marginRight: '10px', display: 'block', textAlign: 'center' }}
      >
        <div className="image-container">
          <AspectRatio ratio='4x3'>
            <GatsbyImage loading='lazy' key={index} className="game-image" image={image} alt={`Play ${game.title} online`}
            //  style={{ width: `${width}px`, height: `${height}px` }}
              />
          </AspectRatio>
          <div className="overlay">
            <div className="overlay-text">Play now!</div>
          </div>
        </div>

        <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
          {game.title}
        </div>

      </Link>
    </Column>
  )

}