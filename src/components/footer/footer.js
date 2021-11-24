import React from "react";
import * as footerStyles from "./footer.module.scss";

const Footer = () => {
  return (
    <>
      <footer className={footerStyles.footer}>
        © {new Date().getFullYear()} Rory Breslin
      </footer>
    </>
  );
};

export default Footer;
