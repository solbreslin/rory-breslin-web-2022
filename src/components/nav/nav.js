import * as React from "react";
import { Link } from "gatsby";

const Nav = ({ navOpen }) => (
  <nav className={navOpen ? "is-open" : ""}>
    <Link to="/work">Work</Link>
    <Link to="/about">About</Link>
    <Link to="/about">Contact</Link>
  </nav>
);

export default Nav;
