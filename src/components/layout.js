import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./../components/header/header";
import Footer from "./../components/footer/footer";
import "./layout.scss";
import { isBrowser } from "../utils";

const Layout = ({ children, invert }) => {
  const [isIndex, setIsIndex] = useState(false);

  useEffect(() => {
    if (isBrowser()) {
      const path = window.location.pathname;
      if (path === "/") {
        setIsIndex(true);
      } else {
        setIsIndex(false);
      }
    }
  }, []);
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
        invert={invert}
      />
      <main className={isIndex ? "is-index" : ""}>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
