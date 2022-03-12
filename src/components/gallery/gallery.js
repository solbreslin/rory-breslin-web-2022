import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import CustomMap from "./../map/map";
import * as styles from "./gallery.module.scss";
import { buildCloudinaryPath, isBrowser } from "./../../utils/index";

import GalleryImage from "./gallery-image";
import GalleryListImages from "./gallery-list-images";
import GalleryToolbar from "./gallery-toolbar";

import {
  filterDraftProjects,
  sortAlphabetically,
  addPaths,
  mapLocationData,
} from "./helpers";

// Process data once, not on each render
let galleryData;
let locationData;

const scroll = top =>
  window.scrollTo({
    top,
    left: 0,
    behavior: "smooth",
  });

const Gallery = ({ initialFilter, data }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [imageHovered, setImageHovered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const toolbarSentinalEl = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    setImageHovered(imageHovered);
  }, [imageHovered]);

  useEffect(() => {
    if (galleryData) return galleryData;

    galleryData = filterDraftProjects(data);
    galleryData = sortAlphabetically(galleryData);
    galleryData = addPaths(galleryData);

    locationData = mapLocationData(galleryData, buildCloudinaryPath);
  }, [data]);

  useEffect(() => {
    if (isBrowser()) {
      if (toolbarSentinalEl && toolbarSentinalEl.current) {
        const top = toolbarSentinalEl.current.offsetTop;

        // Prevents scroll DOWN to `top` - we only want scroll back UP
        if (window.scrollY < top) return;

        scroll(top);
      }
    }
  }, [activeFilter]);

  // https://etcoding.com/blog/2020/12/14/calling-a-function-in-a-child-or-sibling-component-in-react/
  // the 'clear filters' button in `map.js` needs to call a method in `gallery-toolbar.js`
  let clearFiltersReceiver = () => {};

  const clearFiltersTrigger = () => {
    clearFiltersReceiver && clearFiltersReceiver();
  };

  const clearFiltersReceiverCreator = handler => {
    clearFiltersReceiver = handler;
  };

  function onListItemHover(e) {
    if (window.innerWidth < 768) return;
    if (!e || !e.target) return;

    if (e.target.closest("a")) {
      const i = e.target.closest("a").dataset.index;

      setImageHovered(i);
    }
  }

  return (
    <div className={styles.container} id="js-gallery-container">
      <div ref={toolbarSentinalEl}></div>
      <GalleryToolbar
        initialFilter={initialFilter}
        emitFilter={setActiveFilter}
        emitLayout={setActiveLayout}
        isLoading={isLoading}
        clearFiltersReceiverCreator={clearFiltersReceiverCreator}
      />
      {activeLayout === "map" ? (
        <CustomMap
          data={
            locationData &&
            locationData.filter(d => {
              return d.category === activeFilter || activeFilter === "all";
            })
          }
          clearFilters={clearFiltersTrigger}
        />
      ) : activeLayout === "list" ? (
        <div
          role="presentation"
          className={`${styles.list} ${!isLoading && styles.ready}`}
        >
          <GalleryListImages
            active={imageHovered}
            data={galleryData}
            filter={activeFilter}
          />
          <div>
            {galleryData &&
              galleryData
                .filter(
                  item =>
                    item.frontmatter.category === activeFilter ||
                    activeFilter === "all"
                )
                .map(({ frontmatter: item, path }, index) => (
                  <Link
                    key={item.title}
                    to={path}
                    data-index={index}
                    onMouseEnter={onListItemHover}
                  >
                    <h3>{item.title}</h3>
                    <span>{item.year}</span>
                  </Link>
                ))}
          </div>
        </div>
      ) : (
        <div className={`${styles.grid} ${!isLoading && styles.ready}`}>
          {galleryData &&
            galleryData
              .filter(
                item =>
                  item.frontmatter.category === activeFilter ||
                  activeFilter === "all"
              )
              .map(({ frontmatter: item, path }, index) => (
                <Link
                  key={item.title}
                  to={path}
                  style={{ "--grid-span": item.isHorizontal ? "2" : "" }}
                >
                  <GalleryImage
                    alt={item.title}
                    url={item.images[0]}
                    isHorizontal={item.isHorizontal}
                  />
                  <h3>{item.title}</h3>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
