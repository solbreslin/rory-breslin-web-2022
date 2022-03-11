import React from "react";
import * as footerStyles from "./footer.module.scss";

const Footer = () => {
  return (
    <>
      <footer className={footerStyles.footer}>
        <p>© {new Date().getFullYear()} Rory Breslin</p>
      </footer>
    </>
  );
};

export default Footer;
