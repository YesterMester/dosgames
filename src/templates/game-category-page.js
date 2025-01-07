import RootLayout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Column, Heading, Grid, Section } from '@carbon/react';
import { GameConsole } from '@carbon/react/icons';
import { GameCol } from '../components/game-col/game-col';
import categoriesMeta from '../data/categories_meta.json';
import { parseContent } from '../components/game-category-viewer/game-category-viewer';
import { SEO as Seo } from '../components/seo';
import BreadcrumbComponent from '../components/bread-crumb/bread-crumb';
const CategoryPage = ({ pageContext }) => {
    // console.log('pageContext', pageContext);
    const title = pageContext.title;
    const breads = [{ name: `${title} games`, url: `/${pageContext.slug}-games` }];
    const categoryMeta = Object.values(categoriesMeta).find(category => category.title === title);
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
            if (title) {
                _data = _games.filter(game =>
                    game.category && game.category === title
                );
            }

            setFilteredGames(_data);
        }

    }, [title, data.allGames.nodes]);

    return (
        <RootLayout>
            <BreadcrumbComponent items={breads}></BreadcrumbComponent>
            <Grid>
                <Column lg={16} sm={4} md={8} xlg={16}>
                    {!pageContext.htmlContent && (
                        <Heading className='game-category-page-head'>
                            {title} games <GameConsole />
                        </Heading>
                    )}
                    {categoryMeta && !pageContext.htmlContent && <p dangerouslySetInnerHTML={{ __html: parseContent(categoryMeta) }}></p>}
                    {pageContext.htmlContent && <div className='game-category-content styled-content carbon-scroll' dangerouslySetInnerHTML={{ __html: pageContext.htmlContent }}></div>}

                </Column>

                <Column lg={16} sm={4} md={8} xlg={16}>
                    <Section level={2}>
                        <Heading className='avail-games-heading'>
                            Available games
                        </Heading>
                    </Section>
                </Column>
                {filteredGames && filteredGames.length > 0 && filteredGames.map((game, index) => (
                    <GameCol key={index} game={game} index={index} />
                ))}
            </Grid>
        </RootLayout>
    )
};

export default CategoryPage;

export const Head = ({ data, pageContext }) => {
    const title = pageContext.title;
    const categoryMeta = Object.values(categoriesMeta).find(category => category.title === title);
    return (
        <>
            <Seo
                seo_title={`${title} Games - Play ${title} Games Online | WePlayDOS`} seo_desc={categoryMeta.conciseDescription} pathname={`${categoryMeta.url}`}
            >

            </Seo>
        </>
    );
}