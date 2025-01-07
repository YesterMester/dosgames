import React from 'react';
import RootLayout from '../components/layout';
const CookiesPage = () => {
  return (
    <RootLayout>
    <div className="helper-pages cookies-page">
      <h1>What Are Cookies?</h1>
      <p>
        As with most websites, weplaydos.games uses cookies to enhance your
        browsing experience. Cookies are small files downloaded to your device
        to store information about your visit. This page explains what
        information they gather, how we use it, and why storing cookies may be
        necessary. It also details how to disable cookies, though this may
        affect certain functionalities.
      </p>
      <h2>How We Use Cookies</h2>
      <p>
        We use cookies for various reasons, outlined below. In most cases, there
        are no industry-standard options to disable cookies without impacting
        site features. If you're unsure whether you need them, it's recommended
        to leave them enabled for optimal functionality.
      </p>
      <h2>Disabling Cookies</h2>
      <p>
        You can prevent cookies from being stored by adjusting your browser
        settings (refer to your browser's help section for instructions).
        However, disabling cookies may affect the functionality of this site
        and many others you visit, often disabling certain features.
      </p>
      <h2>The Cookies We Set</h2>
      <ul>
        <li>
          <strong>Site Preferences Cookies:</strong> To enhance your experience,
          we offer functionality to set your preferences for how the site runs.
          Cookies store this information for recall when you interact with
          affected pages.
        </li>
        <li>
          <strong>Third-Party Cookies:</strong> In specific cases, we use cookies
          from trusted third parties. This includes Google Analytics, a widely
          used analytics solution, to understand your site usage for continual
          improvement. These cookies may track metrics such as time spent on
          the site and visited pages.
        </li>
      </ul>
      <h2>Third-Party Analytics</h2>
      <p>
        Third-party analytics help track and measure site usage, contributing to
        the production of engaging content. These cookies may record information
        like your site duration and visited pages, aiding our understanding of
        how to enhance your experience.
      </p>
      <h2>Testing and Optimization</h2>
      <p>
        During the testing of new features and subtle changes to site delivery,
        cookies are used to ensure a consistent user experience. They help us
        identify user-preferred optimizations while maintaining site
        functionality.
      </p>
      <h2>Contributions to Third-Party Data</h2>
      <p>
        It's important to note that third parties may use cookies for various
        purposes outlined in their respective privacy policies.
      </p>
      <h2>More Information</h2>
      <p>
        We hope this clarifies the use of cookies on weplaydos.games. If you have
        uncertainties about whether you need cookies enabled, it's usually safer
        to keep them on, especially if they interact with features you use. For
        further information, feel free to contact us at{' '}
        <a href="mailto:contact@weplaydos.games">contact@weplaydos.games</a>.
      </p>
    </div>
    </RootLayout>
  );
};

export default CookiesPage;
