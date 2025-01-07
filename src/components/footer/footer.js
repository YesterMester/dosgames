import React from 'react';
import {  Column, FlexGrid, Row } from '@carbon/react';
import topMenu  from '../../data/menu.json';
import { Link } from 'gatsby';
import ShareButtons from '../social-share/social-share';
import { useSiteMetadata } from '../seo';
import { getPHBranding } from '../header/header';

const Sec1Links = [
  { href: "/", text: "Home" },
  {href: "/about-us", text: "About Us"},
  { href: "/dmca", text: "DMCA/Removal Request" },
  { href: "/declaration", text: "Declaration" },
  { href: "/cookie-policy", text: "Cookie Policy" },
  { href: "/terms-of-service", text: "Terms of Service" },
  { href: "/privacy-policy", text: "Privacy Policy" },
  // Add more links as needed
];

const Sec2Links = topMenu[0].children;

const RootFooter = () => {
  const siteMetaData = useSiteMetadata();
  return (
    <footer className='layout-footer'>
      <FlexGrid>
        <Row>
          <Column lg={3} md={3}>
    
            
            {getPHBranding(150,40)}
            <center>
            <strong>WePlayDOS </strong>
            <br></br>
            <img style={{marginTop:'1rem'}} src="/logo.gif" height="60" width="60"  alt="We Play DOS logo" />
            </center>
            
          </Column>
          <Column lg={4} md={2}>
            <ul>
              {Sec1Links.map(link => (
                <li className='footer-li' key={link.text}>
                  <Link className='gatsby-link' to={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </Column>
          <Column lg={4} md={2}>
            <ul>
              {Sec2Links.map(link => (
                <li className='footer-li' key={link.path}>
                  <Link className='gatsby-link' to={link.path}>{link.title} games</Link>
                </li>
              ))}
            </ul>
          </Column>
          <Column lg={4} md={4}>
            <p>
            We preserve and celebrate the golden era of DOS gaming by providing seamless, browser-based access to classic DOS games. Our mission is to keep the spirit of retro gaming alive, making it accessible for everyone, anytime.
              </p>
            <center>
              <ShareButtons title={siteMetaData.title} url={siteMetaData.siteUrl}></ShareButtons>
            </center>
          </Column>
        </Row>
        <Row>
          <Column>
            <p>© {new Date().getFullYear()} WePlayDOS.games. All rights reserved.</p>
          </Column>
        </Row>
      </FlexGrid>
    </footer>
  );
};

export default RootFooter;