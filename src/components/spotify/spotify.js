import React from "react";
import { Spotify } from "react-spotify-embed";

const SpotifyComponent = ({link, wide}) => {
  return (
   <Spotify className="spotify-player" link={link} wide={wide} />
  );
}

export default SpotifyComponent;