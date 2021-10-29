import React, { useState, useEffect, useRef } from "react";
import { carousel, isActive } from "./carousel.module.scss";

// TODO move to JSON or MD file
const images = [
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1583825783/r-breslin-cloudinary/BANNER/mask-banner_shmoax.jpg",
    title: "Mask",
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1581734973/r-breslin-cloudinary/WORK/EXHIBITION/la-petite-mort/EXHIBITION_la-petite-mort_la-petite-mort-03_apc8zj.jpg",
    title: "Petit Mort",
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1583554582/r-breslin-cloudinary/WORK/PUBLIC/brian-boru/brian-boru_brian-boru-01_nb0exo.jpg",
    title: "Brian Boru",
  },
];

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
  }, 5000);

  return (
    <div className={carousel}>
      {images.map((image, index) => (
        <div className={active === index ? isActive : ""} key={image.title}>
          <img src={image.url} alt={image.title} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
