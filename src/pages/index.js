import React, { useState } from 'react';
import { Button, Column, Grid, Heading, Section, Accordion, AccordionItem, UnorderedList, ListItem, Tile, TextInput, Form, InlineNotification } from '@carbon/react';
import RootLayout from '../components/layout';
import GameCategoryViewerComponent from '../components/game-category-viewer/game-category-viewer';
import categoriesMeta from '../data/categories_meta.json';
import { SEO as Seo } from '../components/seo';
import { Link } from 'gatsby';
import RecentGamesComponent from '../components/recent-games/recent-games';
import SpotifyComponent from '../components/spotify/spotify';
import ScrollButton from '../components/scroll-button/scroll-button';
// import AmazonProductComponent from '../components/amazon/amazon';

const itemCount = 16;

const IndexCallout = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error message

    const formData = new FormData();
    formData.append('q3_email', email);
    formData.append('formID', '242155629925463');
    formData.append('JWTContainer', '');
    formData.append('cardinalOrderNumber', '');
    formData.append('jsExecutionTracker', 'build-date-1714075632241');
    formData.append('submitSource', 'unknown');
    formData.append('buildDate', '1714075632241');

    fetch('https://submit.jotform.com/submit/242155629925463', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) { // Checks if the response status code is not in the range 200-299
          throw new Error('Network response was not ok. Status: ' + response.status);
        }
        return response.text(); // or response.json() if the server responds with JSON
      })
      .then(data => {
        setSuccess('You have been added to the waitlist!');
        setEmail(''); // Reset email input
        setError(''); // Reset error message if any
        setIsLoading(false);
        localStorage.setItem('koin-waitlist', 'true');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('An error occurred. Please try again.');
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid className='cta-grid' style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
      <Column lg={16} sm={8} md={8} xlg={16}>
        <Tile style={{ padding: '2rem' }}>
          <h4>Recapture the Magic: Build Your Own Retro Gaming Cabinet</h4>
          <p>Dive back into the golden age of gaming with our open-source platform. Create a custom DOS gaming cabinet and enjoy classic games offline. Be among the first to experience this nostalgic journey.</p>
          <p><strong>Join the Waitlist Now</strong></p>
          {error && (<InlineNotification kind="error" title="Error" subtitle={error} />)}
          {success && (<InlineNotification kind="success" title="Success" subtitle={success} />)}
          {!success && (
            <Form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
              <TextInput
                id="email-input-waitlist"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for waitlist"
                helperText="Your email is safe with us. We never share"
              />
              <Button
                kind="primary"
                type="submit"
                disabled={isLoading}
                style={{ marginTop: '1rem' }}
                size='sm'
              >
                {isLoading ? 'Submitting...' : 'Join the Waitlist!'}
              </Button>
            </Form>
          )}
        </Tile>
      </Column>
    </Grid>
  );
};

const IndexCallout2 = () => {
  return (
    <Grid>
      <Column lg={16} sm={4} md={8} xlg={16}>
        <Heading style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome to WePlayDOS.games! Play Classic DOS Games Online.</Heading>
        <Section>
          <Heading style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tune in to our Spotify podcast! Each episode is a journey back to the golden age of gaming, filled with nostalgia and classic memories.</Heading>
          <SpotifyComponent link={'https://open.spotify.com/show/1Wvn2aRESr3xPifp4ckxBf'} wide={true}></SpotifyComponent>
          <IndexCallout />
        </Section>
      </Column>
      <Column lg={16} sm={4} md={8} xlg={16}>
        <Heading style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Top DOS games</Heading>
        <Grid>
          <Column lg={8} sm={4} md={8} xlg={8}>
            <UnorderedList>
              <ListItem><Link to="/online/lemmings/">Lemmings computer game</Link></ListItem>
              <ListItem><Link to="/online/prince-of-persia/">Prince of Persia</Link></ListItem>
              <ListItem><Link to="/online/zork-the-great-underground-empire/">Zork</Link></ListItem>
              <ListItem><Link to="/online/sid-meiers-civilization/">Sid Meier's Civilization</Link></ListItem>
              <ListItem><Link to="/online/wolfenstein-3d/">Wolfenstein</Link></ListItem>
            </UnorderedList>
          </Column>
          <Column lg={8} sm={4} md={8} xlg={8}>
            <UnorderedList>
              <ListItem><Link to="/online/doom/">Doom</Link></ListItem>
              <ListItem><Link to="/online/crusher-castle-ii/">Crusher Castle II</Link></ListItem>
              <ListItem><Link to="/online/duke-nukem-3d/">Duke Nukem 3D</Link></ListItem>
              <ListItem><Link to="/online/the-oregon-trail/">The Oregon Trail computer game</Link></ListItem>
            </UnorderedList>
          </Column>
        </Grid>
      </Column>
    </Grid>
  );
};

const FAQs = () => {
  return (
    <Grid style={{ marginTop: '2rem' }}>
      <Column lg={16} sm={4} md={8} xlg={16}>
        <section>
          <Heading level={2} style={{ marginBottom: '1rem' }}>Frequently Asked Questions</Heading>
          <Accordion>
            <AccordionItem title="What is WePlayDOS.Games?">
              <p>WePlayDOS.Games is a platform where you can play classic DOS games online and offline.</p>
            </AccordionItem>
            <AccordionItem title="How can I play games on this platform?">
              <p>You can browse through different game categories and select a game to play directly in your browser.</p>
            </AccordionItem>
            <AccordionItem title="Do I need to install any software to play the games?">
              <p>No, you can play the games directly in your browser without installing any additional software.</p>
            </AccordionItem>
            <AccordionItem title="Is it free to play the games?">
              <p>Yes, all the games on WePlayDOS.Games are free to play.</p>
            </AccordionItem>
          </Accordion>
        </section>
      </Column>
    </Grid>
  );
};

const amazonProducts = [
  {
    image: 'https://m.media-amazon.com/images/I/71e004wOmML.jpg',
    title: '30000+ Wireless Retro Game Stick Review: Worth It?',
    description: 'Retro gaming enthusiasts might find their next favorite gadget in the new 30000+ Wireless Game Stick from Calico Critters. This gaming console offers a massive selection of over 30,000 built-in games, promising endless entertainment.',
    buyLink: 'https://amzn.to/4hfhRyV',
    readMoreLink: '/products/retro-gaming-revolution-wireless-stick-review/'
  },
  {
    image: 'https://m.media-amazon.com/images/I/519UIdaanIL.jpg',
    title: 'Microsoft Controller: Pulse Red Review - Worth It?',
    description: `It's always exciting to find gaming gear that balances design and functionality, and that's exactly what the Pulse Red Xbox Controller does.`,
    buyLink: 'https://amzn.to/3UnqRIc',
    readMoreLink: '/products/pulse-red-xbox-controller-review/'
  }
];

const AmazonProducts = () => {
  return (
    <Section id="amazon-products" className="amazon-product-section">
      <Grid>
        <Column lg={16} sm={4} md={8} xlg={16}>
          <Section level={3}>
            <Heading className='game-category-page-head'>
              Top Retro Gaming Gear on Amazon
            </Heading>
          </Section>
        </Column>
        {amazonProducts.map((product, index) => (
          <Column key={index} lg={8} md={8} sm={12}>
            {/* <AmazonProductComponent product={product} /> */}
          </Column>
        ))}
      </Grid>
    </Section>
  )
}

const IndexPage = () => {
  const scrollToCategories = () => {
    document.getElementById('game-categories').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <RootLayout>
      {/* {!user && <IndexCallout2 />} */}
      <RecentGamesComponent />


      {/* <AmazonProducts></AmazonProducts> */}



      <ScrollButton scrollToCategories={scrollToCategories}></ScrollButton>
      <Section id="game-categories" style={{ textAlign: 'justify' }}>
        <GameCategoryViewerComponent id="" description={categoriesMeta.action} count={itemCount} heading={'Action'} gameCategory={'Action'} />
        <GameCategoryViewerComponent description={categoriesMeta.rolePlaying} count={itemCount} heading={'Role-Playing (RPG)'} gameCategory={'Role-Playing (RPG)'} />
        <GameCategoryViewerComponent description={categoriesMeta.adventure} count={itemCount} heading={'Adventure'} gameCategory={'Adventure'} />
        <GameCategoryViewerComponent description={categoriesMeta.strategy} count={itemCount} heading={'Strategy'} gameCategory={'Strategy'} />
        <GameCategoryViewerComponent description={categoriesMeta.simulation} count={itemCount} heading={'Simulation'} gameCategory={'Simulation'} />
        <FAQs />
      </Section>
    </RootLayout>
  );
};

export default IndexPage;

export const Head = ({ pageContext }) => {
  return (
    <Seo />
  );
};