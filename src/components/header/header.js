import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import * as headerStyles from "./header.module.scss";
import BurgerButton from "../BurgerButton/burger-button";

const Header = ({ siteTitle }) => {
  const [navOpen, setNavOpen] = useState(false);
  const headerEl = useRef(null);

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("o-hidden");
    } else {
      document.body.classList.remove("o-hidden");
    }
  }, [navOpen]);

  useEffect(() => {
    if (document !== undefined) {
      const height = headerEl.current.clientHeight;

      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    }
  }, []);

  const updateParent = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header
      className={`${headerStyles.header} ${navOpen ? headerStyles.active : ""}`}
      ref={headerEl}
    >
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <span hidden id="menu-label">
        Main menu
      </span>
      <BurgerButton rotated={navOpen} updateParent={updateParent} />
      <nav aria-labelledby="menu-label">
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
