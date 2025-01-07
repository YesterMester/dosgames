import { AspectRatio, Column, FlexGrid, Heading, Row, Section } from "@carbon/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import GameScreenshotModal from "../game-screenshot-viewer/game-screenshot-viewer";

const GameScreenshots = ({ game }) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

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

  const [screenshotsData, setScreenshotsData] = useState([]);

  useEffect(() => {
    if (game && game.screenshots) {
      let _scData = [];
      if (data.allFile.edges) {
        let edges = data.allFile.edges;
        for (let i = 0; i < game.screenshots.length; i++) {
          const imageNode = edges.find(edge => edge.node.relativePath.includes(game.screenshots[i]));
          _scData.push(getImage(imageNode.node.childImageSharp.gatsbyImageData));
        }
      }
      setScreenshotsData(_scData);
    }

  }, [game,data.allFile.edges]);
  return (
    <>
      <FlexGrid>
        <Row>
          <Section className='game-screenshots-section' level={3}>
            <Heading>
              Screenshots
            </Heading>
          </Section>
        </Row>
        <Row>
          {screenshotsData.map((screenshot, index) => (
            <Column className="game-screenshot-col" lg={8} key={index} onClick={() => openModal(index)}>
              <AspectRatio ratio="16x9" as="div">
                <GatsbyImage image={screenshot} alt={`${game.title}-screenshot-${index}`} />
              </AspectRatio>
            </Column>
          ))}
        </Row>

      </FlexGrid>
      <GameScreenshotModal game={game} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} screenshotsData={screenshotsData}></GameScreenshotModal>
    </>

  )
};

export default GameScreenshots;