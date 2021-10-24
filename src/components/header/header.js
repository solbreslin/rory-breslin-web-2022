import React, { useState } from "react";
import { Link } from "gatsby";
import Nav from "./../nav/nav";
import { header } from "./header.module.scss";

const Header = ({ siteTitle }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={header}>
      <Link to="/">{siteTitle}</Link>
      <Nav navOpen={navOpen} />
      <button onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? "Close" : "Menu"}
      </button>
    </header>
  );
};

export default Header;
