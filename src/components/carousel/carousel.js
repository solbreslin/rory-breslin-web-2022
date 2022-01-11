import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";

import { carousel, counter, isActive, isBright } from "./carousel.module.scss";

// TODO move to JSON or MD file
const images = [
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1583825783/r-breslin-cloudinary/BANNER/mask-banner_shmoax.jpg",
    title: "Guinness Mask",
    project_link: "the-guinness-mask",
    has_bright_overlay_text: true,
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1581734973/r-breslin-cloudinary/WORK/EXHIBITION/la-petite-mort/EXHIBITION_la-petite-mort_la-petite-mort-03_apc8zj.jpg",
    title: "La Petit Mort",
    project_link: "la-petite-mort",
    has_bright_overlay_text: false,
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1583554582/r-breslin-cloudinary/WORK/PUBLIC/brian-boru/brian-boru_brian-boru-01_nb0exo.jpg",
    title: "Brian Boru",
    project_link: "brian-boru",
    has_bright_overlay_text: true,
  },
];

const TRANSITION_SPEED = 5000;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Carousel = () => {
  const [active, setActive] = useState(0);

  useInterval(() => {
    setActive(prevActive =>
      prevActive === images.length - 1 ? 0 : prevActive + 1
    );
  }, TRANSITION_SPEED);

  return (
    <div className={carousel}>
      <>
        {images.map((image, index) => (
          <React.Fragment key={image.title}>
            <h3
              className={`${image.has_bright_overlay_text ? isBright : ""} ${
                active === index ? isActive : ""
              }`}
            >
              <Link to={"work/" + image.project_link}>{image.title}</Link>
            </h3>
            <div className={active === index ? isActive : ""}>
              <img src={image.url} alt={image.title} />
            </div>
          </React.Fragment>
        ))}

        <span
          className={`${
            images.find((img, i) => active === i).has_bright_overlay_text
              ? isBright
              : ""
          } ${counter}`}
        >
          {active + 1} / {images.length}
        </span>
      </>
    </div>
  );
};

export default Carousel;
