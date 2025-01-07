import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from "gatsby";

export const onRouteUpdate = ({ location, prevLocation }) => {
  // console.log('Route updated:', location, prevLocation);
  setTimeout(() => {
    window.scrollTo(0, 0);
    // console.log('Scrolled to top');
  }, 0);
};

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/', { replace: true });
};

export const wrapRootElement = ({ element }) => {
  return (
   <Auth0Provider
   domain={'dev-y27lxavr02scmif8.us.auth0.com'}
   clientId={'jclY1uHk29dMQCtQqkRPUlJI2Cd5mRwA'}
   useRefreshTokens={true}
   cacheLocation='localstorage'
   onRedirectCallback={onRedirectCallback}
   authorizationParams={{
      redirect_uri: 'https://weplaydos.games',
      audience: 'https://hello-world.example.com',
      scope: 'openid profile email offline_access'
    }}
    >
     {element}
  </Auth0Provider>
  );
 };
