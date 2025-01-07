import React, { useState, useEffect } from "react";

import {
  Header,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavLink,
  SideNavMenuItem,
  Button,
  HeaderMenu,
  HeaderMenuItem,
  HeaderNavigation
} from "@carbon/react";
import { Home, Categories, SelectWindow, Blog, Logout, Login } from "@carbon/icons-react";
import SearchComponent from "../search/Search";
import topMenu from '../../data/menu.json';
import { Link } from "gatsby";
import { useAuth0 } from "@auth0/auth0-react";


const LoginBtn = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return (!isAuthenticated && (
    <Button kind='ghost'
      renderIcon={Login}
      // style={AuthBtnStyle}
      onClick={() => loginWithRedirect(
        {
          appState: { returnTo: window.location.pathname }
        }
      )
      }>Log in</Button>
  ));
}



const LogoutBtn = () => {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  const handleLogout = () => {
    const returnToUrl = window.location.origin || 'https://weplaydos.games';
    console.log('Logging out, returnTo:', returnToUrl);
    logout({ logoutParams: { returnTo: returnToUrl } });
  };

  return isAuthenticated && (
    <Button
      renderIcon={Logout}
      kind='ghost'
      onClick={handleLogout}>
      Log out
    </Button>
  );
}


const isActive = (path) => {
  if (typeof window !== "undefined")
    return window.location.pathname === path;
}

const isMenuActiveAndExpanded = (list) => {
  if (typeof window !== "undefined") {
    let isActiveChild = list.find(item => item.path === window.location.pathname);
    return isActiveChild ? true : false;
  }
}

export const getPHBranding = (width = 230, height = 54, theme = 'dark') => {
  return (
    <center>
      <a href="https://www.producthunt.com/posts/weplaydos?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-weplaydos" target="_blank">
        <img style={{ animation: 'pulse 2s infinite' }} src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=477263&theme=${theme}`} alt="WePlayDOS - Play&#0032;classic&#0032;DOS&#0032;games&#0032;in&#0032;browser | Product Hunt"
          width={width} height={height}
        />
      </a>
    </center>
  )
}

export const FixedSideNavWIcons = () => {
  const { user } = useAuth0();
  // console.log('user', user, isLoading, isAuthenticated);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  const categoryMenu = topMenu.find(menu => menu.title === 'Game Categories');
  const sagaMenu = topMenu.find(menu => menu.title === 'Game Sagas');
  const toggleSideNav = () => setIsSideNavExpanded(!isSideNavExpanded);

  useEffect(() => {
    // Update state to the actual value when component mounts in the browser
    // setIsSideNavExpanded(window.innerWidth > 768);

    const handleResize = () => {
      setIsSideNavExpanded(window.innerWidth > 768);
    };
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  // Ensure the component can handle the state being undefined during SSR
  if (typeof isSideNavExpanded === 'undefined') {
    return null; // or a loader, or SSR-friendly output
  }



  return (
    <>
      <Header aria-label="We Play DOS games">
        <SkipToContent />
        <HeaderMenuButton aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'} onClick={toggleSideNav} isActive={isSideNavExpanded} aria-expanded={isSideNavExpanded}></HeaderMenuButton>
        <Link className="gatsby-link" to="/">
          <HeaderName prefix="">
            WePlayDOS
            <img style={{ marginLeft: '3px' }} src="/logo.gif" height="30" width="30" alt="We Play DOS logo" />
          </HeaderName>
        </Link>
        <HeaderGlobalBar>
          {/* {!user && <LoginBtn />} */}
          {user &&
            <HeaderNavigation>
              <HeaderMenu aria-label="Link 4" menuLinkName={`Hi ${user.given_name || user.nickname || user.name}!`}>
                <HeaderMenuItem isActive href="#">
                  <LogoutBtn />
                </HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>
          }

          <SearchComponent></SearchComponent>


        </HeaderGlobalBar>
      </Header>
      <SideNav expanded={isSideNavExpanded} isChildOfHeader={true} aria-label="Side navigation">
        <SideNavItems>
          {getPHBranding()}
          <Link className="gatsby-link" to="/">
            <SideNavLink renderIcon={Home} isActive={isActive('/')}>
              Home
            </SideNavLink>
          </Link>
          <Link className="gatsby-link" to="/blogs/">
            <SideNavLink renderIcon={Blog} isActive={isActive('/blogs/')}>
              Blogs
            </SideNavLink>
          </Link>

          {/* defaultExpanded={isMenuActiveAndExpanded(categoryMenu.children)} */}
          <SideNavMenu defaultExpanded={true} isActive={isMenuActiveAndExpanded(categoryMenu.children)} renderIcon={Categories} title={categoryMenu.title}>
            {categoryMenu.children.map((category, index) => {
              return (
                <Link key={index} className="gatsby-link" to={category.path}>
                  <SideNavMenuItem key={index} isActive={isActive(category.path)}>
                    {category.title}
                  </SideNavMenuItem>
                </Link>
              )
            })}
          </SideNavMenu>


          <SideNavMenu renderIcon={SelectWindow} defaultExpanded={true} isActive={isMenuActiveAndExpanded(sagaMenu.children)} title={sagaMenu.title}>
            {sagaMenu.children.map((saga, index) => {
              return (
                <Link key={index} className="gatsby-link" to={saga.path}>
                  <SideNavMenuItem key={index} isActive={isActive(saga.path)}>
                    {saga.title}
                  </SideNavMenuItem>
                </Link>
              )
            })}
          </SideNavMenu>
        </SideNavItems>
      </SideNav>
    </>)
};

const RootHeader = () => (
  <FixedSideNavWIcons></FixedSideNavWIcons>
);

export default RootHeader;