import React from "react";
import * as burgerStyles from "./burger-button.module.scss";

const BurgerButton = ({ navOpen, updateParent, isInvert }) => {
  const onToggle = () => {
    updateParent();
  };

  return (
    <button
      onClick={() => onToggle()}
      className={`${burgerStyles.button} ${isInvert && burgerStyles.invert} ${
        navOpen && burgerStyles.open
      }`}
      aria-labelledby="menu-label"
      aria-expanded={navOpen}
    >
      <span className="sr-only">{navOpen ? "Close menu" : "Open menu"}</span>
    </button>
  );
};

export default BurgerButton;
