import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import * as styles from "./header.module.scss";
import BurgerButton from "../BurgerButton/burger-button";

const Header = ({ siteTitle, index }) => {
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
        "--rb-header-height",
        `${height}px`
      );
    }
  }, []);

  const updateParent = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className={styles.header} ref={headerEl}>
      <h1 className={styles.brand}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <span hidden id="menu-label">
        Main menu
      </span>
      <BurgerButton navOpen={navOpen} updateParent={updateParent} />
      <nav
        aria-labelledby="menu-label"
        className={`${styles.nav} ${navOpen ? styles.active : ""} ${
          index ? styles.index : ""
        }`}
      >
        <ul id="menu" className={navOpen ? "is-open" : ""}>
          <li>
            <Link
              to="/work"
              partiallyActive={true}
              activeClassName={styles.current}
            >
              Work
            </Link>
          </li>
          <li>
            <Link to="/about" activeClassName={styles.current}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" activeClassName={styles.current}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
