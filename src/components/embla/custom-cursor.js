import React, { useEffect, useState } from "react";
import { isBrowser } from "./../../utils/";
import * as styles from "./custom-cursor.module.scss";

const BREAKPOINT = 769;
const Boundary = {
  TOP: 40,
  RIGHT: 20,
  BOTTOM: 40,
  LEFT: 20,
  BUTTON_LEFT: 60,
  BUTTON_BOTTOM: 80,
};

const showDefaultCursor = () => {
  if (!isBrowser()) return;

  document.documentElement.style.setProperty("--em-cursor", "default");
};

const hideDefaultCursor = () => {
  if (!isBrowser()) return;

  document.documentElement.style.setProperty("--em-cursor", "none");
};

const CustomCursor = ({ prevEnabled, nextEnabled }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [right, setRight] = useState(false);
  const [ww, setWw] = useState(0);
  const [wh, setWh] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [styleStr, setStyleStr] = useState({});

  useEffect(() => {
    if (isBrowser()) {
      setWw(window.innerWidth);
      setWh(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWw(window.innerWidth);
      setWh(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ww, wh]);

  useEffect(() => {
    let hasMoved = false;

    function cursorIsOutsideBounds(x, y) {
      const outsideTop = () => {
        return y < Boundary.TOP;
      };

      const outsideBottom = () => {
        return y > wh - Boundary.BOTTOM;
      };

      const outsideLeft = () => {
        return x < Boundary.LEFT;
      };

      const outsideRight = () => {
        return x > ww - Boundary.RIGHT;
      };

      return outsideTop() || outsideBottom() || outsideLeft() || outsideRight();
    }

    function cursorIsOverCloseButton(x, y) {
      return y < Boundary.BUTTON_BOTTOM && x > ww - Boundary.BUTTON_LEFT;
    }

    function mouseHandler({ clientX, clientY }) {
      setX(clientX);
      setY(clientY);

      if (!hasMoved) {
        setHidden(false);
        hasMoved = true;
      }

      // Hide the custom cursor if the cursor is close to the edge
      if (
        cursorIsOutsideBounds(clientX, clientY) ||
        cursorIsOverCloseButton(clientX, clientY)
      ) {
        setHidden(true);
        showDefaultCursor();
      } else {
        setHidden(false);
        hideDefaultCursor();
      }
    }

    if (ww > BREAKPOINT) {
      window.addEventListener("mousemove", mouseHandler);
    } else {
      setHidden(true);
      showDefaultCursor();
    }

    return () => {
      window.removeEventListener("mousemove", mouseHandler);

      setX(0);
      setX(0);
    };
  }, [ww, wh]);

  useEffect(() => {
    setRight(x > ww / 2);
  }, [x, ww, wh]);

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

    const opacity = hidden ? 0 : disabled ? 0.4 : 1;

    setStyleStr({ transform, opacity });
  }, [right, hidden, disabled, x, y]);

  return <span className={styles.cursor} style={styleStr}></span>;
};

export default CustomCursor;
