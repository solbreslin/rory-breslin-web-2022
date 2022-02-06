import React from "react";
import * as styles from "./close-button.module.scss";

const CloseButton = ({ action }) => (
  <button title="Close" className={styles.button} onClick={() => action()}>
    <span className="sr-only">Close</span>
  </button>
);

export default CloseButton;
