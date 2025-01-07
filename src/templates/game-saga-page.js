import React, { useEffect, useState } from 'react';
import RootLayout from '../components/layout';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Grid, Heading, Column, Section, UnorderedList, ListItem, Tile } from '@carbon/react';
import { GameCol } from '../components/game-col/game-col';
import sagas from '../data/sagas.json';
import { SEO as Seo } from '../components/seo';
import BreadcrumbComponent from '../components/bread-crumb/bread-crumb';

const SagaPage = ({ pageContext }) => {
    const title = pageContext.title;
    const slug = pageContext.slug;
    const breads = [{name:`${title} games`, url:`/game-saga/${slug}-saga`}];
    const saga = sagas.find(saga => saga.slug === slug);
    const sagaTitle = saga ? saga.title : (title + ' games');
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
                    game.saga && game.saga === title
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
                <Heading className='game-category-page-head'>
                        {sagaTitle}
                    </Heading>
                    {saga && saga.description && <p dangerouslySetInnerHTML={{ __html: saga.description }}></p>}
                </Column>
                {filteredGames && filteredGames.length > 0 && filteredGames.map((game, index) => (
                    <GameCol key={index} game={game} index={index} />
                ))}
            </Grid>


            {saga && saga.games && saga.games.length > 0 && (
                <>
                    <Grid>
                        <Column lg={16} sm={4} md={8} xlg={16}>
                            <Section>
                                <Heading className='game-category-page-head'>
                                    More about featured games
                                </Heading>
                            </Section>
                        </Column>

                        {saga.games && saga.games.length > 0 && saga.games.map((game, index) => (
                            <Column lg={5} md={4} sm={4} key={index}>
                                <Tile>
                                    <Section>
                                        <Heading>{game.name}</Heading>
                                        <Section level={4}>
                                            <Heading>
                                                Release year: {game.release_year}
                                            </Heading>
                                        </Section>
                                        <p>{game.description}</p>
                                        <br></br>
                                        <Section>
                                            <Heading>Features</Heading>
                                        </Section>
                                        <UnorderedList>
                                            {game.features.map((feature, i) => (
                                                <ListItem key={i}>{feature}</ListItem>
                                            ))}
                                        </UnorderedList>

                                    </Section>
                                    <br></br>
                                    <p><strong>Why play:</strong> {game.why_play}</p>
                                </Tile>
                            </Column>
                        ))}
                    </Grid>

                    <Grid>
                        <Column lg={16} sm={4} md={8} xlg={16}>
                            <Section>
                                <Heading className='game-category-page-head'>
                                    Play {title} games online
                                </Heading>
                                <p>{saga.conclusion}</p>
                            </Section>
                        </Column>
                    </Grid>

                    <Grid>
                        {filteredGames && filteredGames.length > 0 && filteredGames.map((game, index) => (
                            <GameCol game={game} index={index} />
                        ))}
                    </Grid>

                    {saga.internal_links && saga.internal_links.length > 0 && (
                        <Grid>
                            <Column lg={16} sm={4} md={8} xlg={16}>
                                <Section>
                                    <Heading className='game-category-page-head'>
                                        Related Sagas
                                    </Heading>
                                    <UnorderedList>
                                        {saga.internal_links.map((link, index) => (
                                            <ListItem key={index}>
                                                <Link className='gatsby-link' to={link.path}>{link.title}</Link>
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </Section>
                            </Column>
                        </Grid>)}
                </>)}

        </RootLayout>
    );
};

export default SagaPage;

export const Head = ({ pageContext }) => {
    const title = pageContext.title;
    const description = `Explore and play the best ${title} games online. Dive into the ${title} saga and enjoy classic DOS games right in your browser.`;
    return (
        <>
            <Seo
                seo_title={`${title} Saga - Play Best ${title} Games Online | We Play DOS Games`} seo_desc={description} pathname={`game-saga/${pageContext.slug}-saga`}
            >

            </Seo>
        </>
    );
}