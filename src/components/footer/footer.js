import React from "react";
import * as footerStyles from "./footer.module.scss";

const Footer = ({ index }) => {
  return (
    <>
      <footer
        className={`${footerStyles.footer} ${index ? footerStyles.index : ""}`}
        id="js-footer"
      >
        <p>© {new Date().getFullYear()} Rory Breslin</p>
      </footer>
    </>
  );
};

export default Footer;
