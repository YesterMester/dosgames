import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon,
  RedditIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

const ShareButtons = ({ url, title }) => (
  <div className="share-buttons">
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <PinterestShareButton url={url} title={title}>
      <PinterestIcon size={32} round />
    </PinterestShareButton>
    <RedditShareButton url={url} title={title}>
      <RedditIcon size={32} round />
    </RedditShareButton>
    <EmailShareButton url={url} subject={title}>
      <EmailIcon size={32} round />
    </EmailShareButton>
  </div>
);

export default ShareButtons;