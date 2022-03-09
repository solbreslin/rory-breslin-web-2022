import React, { useState } from "react";
import { Link } from "gatsby";
import { useInterval } from "../../shared/hooks";
import * as styles from "./carousel.module.scss";

import images from "./data";

const TRANSITION_SPEED = 5000;

const Carousel = () => {
  const [active, setActive] = useState(0);

  useInterval(() => {
    setActive(prevActive =>
      prevActive === images.length - 1 ? 0 : prevActive + 1
    );
  }, TRANSITION_SPEED);

  return (
    <div className={styles.carousel}>
      <>
        {images.map((image, index) => (
          <React.Fragment key={image.title}>
            <h3
              className={` ${active === index ? styles.isActive : ""} ${
                styles.title
              }`}
              style={{
                "--text-color": image.has_bright_overlay_text ? "white" : "",
              }}
            >
              <Link to={"work/" + image.project_link}>{image.title}</Link>
            </h3>
            <div
              className={`${active === index ? styles.isActive : ""} ${
                styles.imageContainer
              }`}
            >
              <img src={image.url} alt={image.title} />
            </div>
          </React.Fragment>
        ))}

        <span
          className={styles.counter}
          style={{
            "--text-color": images.find((img, i) => active === i)
              .has_bright_overlay_text
              ? "white"
              : "",
          }}
        >
          {active + 1} / {images.length}
        </span>
      </>
    </div>
  );
};

export default Carousel;
