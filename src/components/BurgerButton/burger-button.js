import React from "react";
import * as burgerStyles from "./burger-button.module.scss";

const BurgerButton = ({ rotated, updateParent }) => {
  const onToggle = () => {
    updateParent();
  };
  return (
    <button
      onClick={() => onToggle()}
      className={burgerStyles.button}
      aria-labelledby="menu-label"
      aria-expanded={rotated}
    >
      {rotated ? "Close" : "Menu"}
    </button>
  );
};

export default BurgerButton;
