import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./embla-carousel-button";

const useKeyPress = (targetKeyCode, callback) => {
  function downHandler(e) {
    if (e.which === targetKeyCode) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKeyCode, downHandler]);
};

export const EmblaCarousel = ({ visible, images, index }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useKeyPress(37, scrollPrev);
  useKeyPress(39, scrollNext);

  return (
    //https://github.com/davidcetinkaya/embla-carousel/issues/210
    <div className="embla" ref={visible ? emblaRef : null}>
      <div className="embla-container" tabIndex="0">
        {images.map((url, i) => (
          <figure key={url + i}>
            <img crossOrigin="anonymous" src={url} alt="" />
          </figure>
        ))}
      </div>
      <div className="embla-nav">
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  );
};
