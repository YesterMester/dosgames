import { useStaticQuery, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { FlexGrid as Grid, Column, Row, Loading } from '@carbon/react';
import { GameConsole } from '@carbon/react/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserSessions } from '../../utils/user-gamer-helper';
// import { GameCol } from './GameCategoryViewer';
import { GameCol } from '../game-col/game-col';


const RecentGamesComponent = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [sessions, setSessions] = useState([]);
    const [gameSessions, setGameSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
              index
            }
          }
        }
      `);

    useEffect(() => {

        async function getSessions() {
            if (!isAuthenticated) return;
            try {
                const sessions = await getUserSessions(getAccessTokenSilently);
                sessions.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSessions(sessions.data);
            }
            catch (e) {
                console.error(e);
            }
        }

        getSessions();
    }, [isAuthenticated, getAccessTokenSilently])


    useEffect(() => {
        if (data.allGames.nodes.length) {
            const _sessions = [];
            sessions.slice(0, 10).map(session => {
                let game = data.allGames.nodes.find(game => Number(game.index) === session.game);
                if (game) {
                    session.gameObj = game;
                    _sessions.push(session);
                }
                // return session;
            });
            setGameSessions(_sessions);
            setIsLoading(false);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        }
    }, [data.allGames.nodes, sessions])

    if (!isAuthenticated) return null;

    if (isLoading) {
        return (
            <center><Loading withOverlay={false} small={true} active={isLoading} /></center>
        )
    }

    if (!gameSessions || gameSessions.length === 0) {
        return (
            <center><p>You will see your recent played games here! Play hard like you Work hard!</p></center>
        )
    }
    return (
        <>
            <Grid fullWidth>
                <Row style={{ marginBottom: '0.5rem' }}>
                    <Column>
                        <h2>
                            Recently Played Games <GameConsole />
                        </h2>
                    </Column>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>

                    {gameSessions && gameSessions.length > 0 && gameSessions.filter(session=>session.gameObj).map((session, index) => {
                        return (
                            <GameCol key={index} game={session.gameObj} />
                        )
                    })}

                </Row>
            </Grid>

        </>
    )
};

export default RecentGamesComponent;