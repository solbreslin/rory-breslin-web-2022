import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "gatsby";
import * as styles from "./header.module.scss";
import BurgerButton from "../BurgerButton/burger-button";
import { isBrowser } from "./../../utils";
import debounce from "lodash.debounce";

const Header = ({ siteTitle, index }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [ww, setWw] = useState(0);
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
      const height = headerEl.current.clientHeight;

      document.documentElement.style.setProperty(
        "--rb-header-height",
        `${height}px`
      );
    }
  }, [ww]);

  const debouncedResize = useCallback(
    debounce(() => {
      setWw(window.innerWidth);
    }, 500)
  );

  useEffect(() => {
    if (isBrowser()) {
      setWw(window.innerWidth);

      window.addEventListener("resize", debouncedResize);
    }

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const updateParent = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className={styles.header} ref={headerEl}>
      <h1 className={styles.brand}>
        <Link to="/">
          <span aria-hidden="true">RB</span>
          <span className="sr-only">{siteTitle}</span>
        </Link>
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
