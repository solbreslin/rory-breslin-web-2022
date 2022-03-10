import React from "react";
import * as styles from "./burger-button.module.scss";

const BurgerButton = ({ navOpen, updateParent }) => {
  const onToggle = () => {
    updateParent();
  };

  return (
    <button
      onClick={onToggle}
      className={`${styles.button} ${navOpen && styles.open}`}
      aria-labelledby="menu-label"
      aria-expanded={navOpen}
    >
      <span id="menu-label" className="sr-only">
        {navOpen ? "Close menu" : "Open menu"}
      </span>
    </button>
  );
};

export default BurgerButton;
