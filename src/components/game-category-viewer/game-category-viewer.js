import { useStaticQuery, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Grid, Column, Heading, Section } from '@carbon/react';
import { GameConsole } from '@carbon/react/icons';
import { GameCol } from '../game-col/game-col';

export function parseContent(meta) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const keywordRegex = /\b(DOS action games|DOS RPGs|DOS adventure games|DOS strategy games|DOS simulation games|DOS sports games|DOS racing games|DOS turn-based strategy games|DOS puzzle games)\b/g;

    return meta.expertDescription
        .replace(boldRegex, '<strong>$1</strong>')
        .replace(keywordRegex, (match) => {
            const url = meta.url;
            // return url ? <Link to={url}>{match}</Link> : match;
            return url ? `<a href="/${url}/">${match}</a>` : match;
        });
}

const GameCategoryViewerComponent = ({ gameCategory, heading, count, saga, isRelated, description }) => {
    const [filteredGames, setFilteredGames] = useState([]);
    const data = useStaticQuery(graphql`
    query {
      allGames {
        nodes {
          id
          title
          slug
          category
          game_id
          saga
          mainImage
        }
      }
    }
  `);

    useEffect(() => {
        let _data = [];
        if (data.allGames.nodes) {
            const _games = data.allGames.nodes;
            if (gameCategory) {
                _data = _games.filter(game =>
                    game.category && game.category === gameCategory
                );
            } else if (saga) {
                _data = _games.filter(game =>
                    game.saga && game.saga === saga
                );
            }

            if (count > 0) {
                setFilteredGames(_data.slice(0, count));
            } else {
                setFilteredGames(_data);
            }
        }

    }, [gameCategory, data.allGames.nodes, saga]);

    return (
        <>
            <Grid className='game-category-grid'>
                <Column lg={16} sm={4} md={8} xlg={16}>
                <Section level={3}>
                    <Heading className='game-category-page-head'>
                        {isRelated ? 'You may also like these similar' : (heading ? heading : ((gameCategory)))} games <GameConsole />
                    </Heading>
                    </Section>
                    {description && <p dangerouslySetInnerHTML={{ __html: parseContent(description) }} className='game-category-page-description'></p>}
                </Column>
                {filteredGames && filteredGames.length > 0 && filteredGames.map((game, index) => (
                    <GameCol key={index} game={game} index={index} />
                ))}
            </Grid>
        </>
    )
};

export default GameCategoryViewerComponent;