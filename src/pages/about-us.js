import React from 'react';
import RootLayout from '../components/layout';
import { LogoGithub, LogoLinkedin, LogoTwitter } from '@carbon/icons-react';
const AboutUsPage = () => {
    return (
        <RootLayout>
            <div class="helper-pages about-us-page">
                <h1>About Us</h1>
                <p>Welcome to <strong>WePlayDOS</strong>, your destination for reliving the golden age of DOS gaming. I'm Mudit Juneja, a Software Engineer by profession and a passionate retro gamer. I started this platform out of love for classic games and a desire to make them accessible to everyone.</p>

                <h2>Why WePlayDOS?</h2>
                <p>As a retro gamer, I wanted to preserve the magic of DOS games and create a space where gamers—old and new—can experience these iconic titles. WePlayDOS offers seamless, browser-based access to a wide range of games, from adventure to strategy.</p>

                <h2>Expertise You Can Trust</h2>
                <p>With a background in software engineering and years spent exploring retro games, I’ve curated a collection of authentic titles that offer a genuine retro experience. This platform was built with expertise and care to ensure high performance and nostalgia.</p>

                <h2>More About Me</h2>
                <p>When I’m not working on WePlayDOS, you can find me exploring new technologies, indulging in modern indie games, or discussing game history with fellow enthusiasts.</p>

                <h2>Join the Community</h2>
                <p>WePlayDOS is more than just a platform—it’s a community. Connect with me and fellow retro gamers through our forums on <a target='_blank' href='https://discord.com/invite/82TAR6fJ8g'>Discord</a>, or reach out directly at <a href="mailto:contact@weplaydos.games">contact@weplaydos.games</a>.</p>

                <h2>Connect with Me</h2>
                <p>Follow me on Github/X/LinkedIn</p>
                <p>
                    <a href="https://twitter.com/being_mudit" target="_blank" rel="noopener noreferrer">
                        <LogoTwitter size={30}/>
                    </a>
                    <a href="https://github.com/muditjuneja" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                       <LogoGithub size={30}/>
                    </a>
                    <a href="https://linkedin.com/in/muditjuneja" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                       <LogoLinkedin size={30}/>
                    </a>
                </p>
            </div>

        </RootLayout>
    );
};

export default AboutUsPage;
