import React from "react"
// import { useSiteMetadata } from "../hooks/use-site-metadata"

import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          keywords
          icon
        }
      }
    }
  `)
    return data.site.siteMetadata
}

const siteName = "WePlayDOS.games"
export const SEO = ({
  pathname,
  children,
  seo_title,
  seo_desc,
  seo_image,
  seo_keywords,
}) => {
  const {
    title: siteTitle,
    description: siteDescription,
    image: siteImage,
    siteUrl,
    keywords
  } = useSiteMetadata()


  const title = seo_title || siteTitle;
  const description = seo_desc || siteDescription;
  const image = `${siteUrl}${seo_image || siteImage}`;
  const url = `${siteUrl}/${pathname ?  (pathname + '/') : ""}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      {/* <meta name="icon" href={icon} /> */}
      {/* <link rel="icon" href={icon} type="image/gif" ></link> */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="keywords" content={seo_keywords || keywords} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Additional Open Graph Tags (optional) */}
      {/* <meta property="og:site_name" content="Your Site Name" /> */}

      {children}
    </>
  )
}