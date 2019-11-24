/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query globalSettingsLayout {
      allContentfulGlobalSettings(limit: 1) {
        nodes {
          colophon
          siteTitle
          siteDescription
          mainNavigation {
            ... on ContentfulNavItem {
              slug
              title
              id
            }
            ... on ContentfulPage {
              title
              slug
              id
            }
          }
          socialLinks {
            id
            icon {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
  `);

  const {
    colophon,
    mainNavigation,
    siteTitle,
    socialLinks,
  } = data.allContentfulGlobalSettings.nodes[0];

  return (
    <>
      <Header mainNavigation={mainNavigation} siteTitle={siteTitle} />
      <main>{children}</main>
      <Footer colophon={colophon} socialLinks={socialLinks} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
