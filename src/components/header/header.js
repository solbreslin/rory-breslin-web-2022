import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import * as headerStyles from "./header.module.scss";

const Header = ({ siteTitle }) => {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("o-hidden");
    } else {
      document.body.classList.remove("o-hidden");
    }
  }, [navOpen]);

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <span hidden id="menu-label">
        Main menu
      </span>
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="menu-toggle"
        aria-labelledby="menu-label"
        aria-expanded={navOpen}
      >
        ☰
      </button>
      <nav
        aria-labelledby="menu-label"
        className={navOpen ? headerStyles.active : ""}
      >
        <ul id="menu" className={navOpen ? "is-open" : ""}>
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <Link to="/work">About</Link>
          </li>
          <li>
            <Link to="/work">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
