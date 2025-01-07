import React, { useEffect } from 'react';
import RootLayout from '../components/layout';
import { graphql } from 'gatsby';
import GamePlayer from '../components/game-player/game-player';
import { SEO as Seo } from '../components/seo';
import { useAuth0 } from '@auth0/auth0-react';
import { saveSession } from '../utils/user-gamer-helper';

export const query = graphql`
  query($slug: String!) {
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
      index
    }
  }
`

const PlayGamePage = ({ data }) => {
  const game = data.games;
  const {  user,getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const css = document.createElement('link');
    css.href = '/js-dos/dist/js-dos.css'; // Adjust the path as necessary
    css.type = 'text/css';
    css.rel = 'stylesheet';
    document.head.appendChild(css);
    // window.scrollTo(document.getElementsByClassName('game-player')[0].offsetTop, 0);
   return () => document.head.removeChild(css);
}, []);

useEffect(() => {
  const _saveSession = async () => {
    try{
    await saveSession(getAccessTokenSilently, game.index);
    }catch(e){
      console.error(e);
    }
  }

  if(user){
    _saveSession();
  }
}, [user]);

  return (
    <RootLayout>
      <h1 style={{ fontSize: '2rem' }}>Play {game.title} now!</h1>
      <h2 style={{ fontSize: '1.2rem' }}>{game.meta_description}</h2>
      <br></br>
      {/* <Tile> */}
        <div style={{ height: '60vh', marginTop:'1rem', marginBottom:'2rem' }} className='game-player'>
          <GamePlayer bundleUrl={'/roms/' + game.game_id + '.jsdos'} />
        </div>
      {/* </Tile> */}
    </RootLayout>
  );
};

export default PlayGamePage;

export const Head = ({ data, pageContext }) => {
  const game = data.games;
  return (
    <>
      <Seo seo_title={`Play ${game.title} - Popular ${game.category} Game In Your Browser | We Play DOS Games`} seo_desc={game.meta_description} seo_keywords={game.keywords} seo_image={`/images/${game.game_id}.jpeg`} pathname={`online/${pageContext.slug}/play`}></Seo>
    </>
  );
}