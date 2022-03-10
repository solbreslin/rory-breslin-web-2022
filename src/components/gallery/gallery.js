import React, { useState, useEffect } from "react";
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
      const siteHeaderHeight = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--rb-header-height");

      const top = siteHeaderHeight ? parseInt(siteHeaderHeight, 0) : 0;

      // Prevents scroll DOWN to `top` - we only want scroll back UP
      if (window.scrollY < top) return;

      scroll(top);
    }
  }, [activeFilter]);

  function handleListHover({ target }) {
    const el = target.closest("a");

    if (!el) return;

    const index = el.dataset.index;

    if (index || index === 0) {
      setImageHovered(index);
    }
  }

  function handleMouseEnter(e) {
    e.stopPropagation();

    if (activeLayout === "list") {
      window.addEventListener("mousemove", handleListHover);
    }
  }

  function handleMouseLeave(e) {
    e.stopPropagation();

    window.removeEventListener("mousemove", handleListHover);
  }

  useEffect(() => {
    if (!isBrowser()) return;

    return window.removeEventListener("mousemove", handleListHover);
  }, []);

  // https://etcoding.com/blog/2020/12/14/calling-a-function-in-a-child-or-sibling-component-in-react/
  // the 'clear filters' button in `map.js` needs to call a method in `gallery-toolbar.js`
  let clearFiltersReceiver = () => {};

  const clearFiltersTrigger = () => {
    clearFiltersReceiver && clearFiltersReceiver();
  };

  const clearFiltersReceiverCreator = handler => {
    clearFiltersReceiver = handler;
  };

  return (
    <div className={styles.container}>
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
      ) : (
        <div
          className={`${
            activeLayout === "grid"
              ? styles.grid
              : activeLayout === "list"
              ? styles.list
              : styles.map
          } ${!isLoading && styles.ready}`}
          onMouseEnter={e => handleMouseEnter(e)}
          onMouseLeave={e => handleMouseLeave(e)}
          role="presentation"
        >
          {activeLayout === "list" && (
            <GalleryListImages
              active={imageHovered}
              data={galleryData}
              filter={activeFilter}
            />
          )}
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
                  style={{ "--grid-span": item.isHorizontal ? "2" : "" }}
                >
                  {activeLayout === "grid" && (
                    <GalleryImage alt={item.title} url={item.images[0]} />
                  )}
                  <h3>{item.title}</h3>
                  {activeLayout === "list" && <span>{item.year}</span>}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
