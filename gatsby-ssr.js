/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preconnect"
      key="preconnect-vars.hotjar"
      href="https://vars.hotjar.com"
    />,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-vars.hotjar"
      href="https://vars.hotjar.com"
    />,
    <link
      rel="preconnect"
      key="preconnect-script.hotjar"
      href="https://script.hotjar.com"
    />,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-script.hotjar"
      href="https://script.hotjar.com"
    />,
  ])
}
