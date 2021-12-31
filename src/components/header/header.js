import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import * as headerStyles from "./header.module.scss";
import BurgerButton from "../BurgerButton/burger-button";
import { isBrowser } from "./../../utils/index";

const Header = props => {
  const [navOpen, setNavOpen] = useState(false);
  const [isInvert, setIsInvert] = useState(false);
  const headerEl = useRef(null);

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("o-hidden");
    } else {
      document.body.classList.remove("o-hidden");
    }
  }, [navOpen]);

  useEffect(() => {
    if (isBrowser()) {
      if (window.location.pathname === "/") {
        setIsInvert(true);
      } else {
        setIsInvert(false);
      }
    }
  }, []);

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
      className={`${headerStyles.header} ${
        navOpen ? headerStyles.active : ""
      } ${isInvert && headerStyles.invert}`}
      ref={headerEl}
    >
      <h1>
        <Link to="/">{props.siteTitle}</Link>
      </h1>
      <span hidden id="menu-label">
        Main menu
      </span>
      <BurgerButton
        navOpen={navOpen}
        updateParent={updateParent}
        isInvert={isInvert}
      />
      <nav aria-labelledby="menu-label">
        <ul id="menu" className={navOpen ? "is-open" : ""}>
          <li>
            <Link to="/work" activeClassName={headerStyles.current}>
              Work
            </Link>
          </li>
          <li>
            <Link to="/about" activeClassName={headerStyles.current}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" activeClassName={headerStyles.current}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
