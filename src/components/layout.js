import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./../components/header/header";
import Footer from "./../components/footer/footer";
import "./layout.scss";

const Layout = ({ children, transparentHeader, index }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        transparent={transparentHeader}
      />
      <main className={index ? "is-index" : ""}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
