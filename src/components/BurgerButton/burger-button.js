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
      <span
        className={`${burgerStyles.cube} ${
          rotated ? burgerStyles.rotated : ""
        }`}
      >
        <span className={burgerStyles.top}></span>
        <span className={burgerStyles.bottom}></span>
        <span className={burgerStyles.left}></span>
        <span className={burgerStyles.right}></span>
        <span className={burgerStyles.front}>
          <span></span>
        </span>
        <span className={burgerStyles.back}>
          <span></span>
          <span></span>
        </span>
      </span>
    </button>
  );
};

export default BurgerButton;
