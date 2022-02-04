import React, { useEffect, useState } from "react";
import { isBrowser } from "./../../utils/";
import * as styles from "./custom-cursor.module.scss";

const CustomCursor = ({ prevEnabled, nextEnabled }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [right, setRight] = useState(false);
  const [ww, setWw] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [styleStr, setStyleStr] = useState({});

  const closeButtonBoundaryX = 60;
  const closeButtonBoundaryY = 90;

  useEffect(() => {
    if (isBrowser()) {
      setWw(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWw(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ww]);

  useEffect(() => {
    let hasMoved = false;

    function mouseHandler({ clientX, clientY }) {
      console.log(clientX, clientY);
      setX(clientX);
      setY(clientY);

      if (!hasMoved) {
        setHidden(false);
        hasMoved = true;
      }

      // Hide the custom cursor if the cursor is close to the close button
      if (
        clientX > ww - closeButtonBoundaryX &&
        clientY < closeButtonBoundaryY
      ) {
        setHidden(true);
        isBrowser() &&
          document.documentElement.style.setProperty("--em-cursor", "default");
      } else {
        setHidden(false);
        isBrowser() &&
          document.documentElement.style.setProperty("--em-cursor", "none");
      }
    }

    if (ww > 800) {
      window.addEventListener("mousemove", mouseHandler);
    } else {
      setHidden(true);
    }

    return () => {
      window.removeEventListener("mousemove", mouseHandler);

      setX(0);
      setX(0);
    };
  }, [ww]);

  useEffect(() => {
    setRight(x > ww / 2);
  }, [x, ww]);

  useEffect(() => {
    if (right) {
      if (!nextEnabled) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      if (!prevEnabled) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [prevEnabled, nextEnabled, right]);

  useEffect(() => {
    const dX = right ? -50 : 0;
    const dY = -25;
    const angle = right ? "-45deg" : "135deg";

    const transform = `translate3d(${x + dX}px, ${
      y + dY
    }px, 0) rotate(${angle})`;

    console.log(transform);

    const opacity = hidden ? 0 : disabled ? 0.4 : 1;

    setStyleStr({ transform, opacity });
  }, [right, hidden, disabled, x, y]);

  return <span className={styles.cursor} style={styleStr}></span>;
};

export default CustomCursor;
