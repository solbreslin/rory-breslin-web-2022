import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./embla-carousel-button";
import CustomCursor from "./custom-cursor";

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
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    startIndex: index || 0,
    speed: 14,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    index => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;

    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  useKeyPress(37, scrollPrev);
  useKeyPress(39, scrollNext);

  return (
    //https://github.com/davidcetinkaya/embla-carousel/issues/210
    <div className="embla" ref={visible ? emblaRef : null}>
      <div className="embla-container">
        {images.map((url, i) => (
          <figure key={url + i}>
            <img crossOrigin="anonymous" src={url} alt="" />
          </figure>
        ))}
      </div>
      <div className="embla-nav">
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <CustomCursor
          prevEnabled={prevBtnEnabled}
          nextEnabled={nextBtnEnabled}
        />
      </div>
      <div class="embla-counter">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
};
