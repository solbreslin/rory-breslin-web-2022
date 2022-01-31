import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import CustomMap from "./../map/map";
import * as styles from "./gallery.module.scss";
import { isBrowser } from "./../../utils/index";

import GalleryImage from "./gallery-image";
import GalleryListImages from "./gallery-list-images";
import GalleryToolbar from "./gallery-toolbar";

// Filter out drafts and alphabetise on page load, not every render
let galleryData;

const filterDraftProjects = data => {
  return data.filter(item => !item.frontmatter.draft);
};

const sortAlphabetically = data => {
  console.log("sorting");
  return data.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
};

const formatPath = str => {
  // Converting `title` property in project markdown file
  // e.g. 'Samuel Beckett' -> samuel-beckett
  const path = str.replace(/\s+/g, "-").toLowerCase();
  return path;
};

const addPaths = data => {
  return data.map(d => {
    console.log(d);
    return {
      ...d,
      path: formatPath(d.frontmatter.title),
    };
  });
};

const mapData = data => {
  if (galleryData) return galleryData;

  galleryData = filterDraftProjects(data);
  galleryData = sortAlphabetically(galleryData);
  galleryData = addPaths(galleryData);

  return galleryData;
};

const mapLocationData = (data, filter) => {
  const locationData = data
    .filter(d => d.frontmatter.location)
    .map(d => {
      let locationObject = JSON.parse(d.frontmatter.location);

      return {
        category: d.frontmatter.category,
        title: d.frontmatter.title,
        coords: locationObject.coordinates.reverse(),
        image: d.frontmatter.images[0],
      };
    })
    .filter(d => {
      return d.category === filter || filter === "all" || !filter;
    });

  return locationData;
};

const Gallery = ({ initialFilter, data }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  // UX improvement - instantly update toolbar on change
  const [activeLayout, setActiveLayout] = useState("grid");
  const [locationData, setLocationData] = useState([]);
  const [imageHovered, setImageHovered] = useState(0);
  const [filterIsChanging, setFilterIsChanging] = useState(false);

  useEffect(() => {
    setImageHovered(imageHovered);
  }, [imageHovered]);

  useEffect(() => {
    const galleryData = mapData(data);

    if (galleryData) {
      setLocationData(mapLocationData(galleryData, activeFilter));
    }
  }, [data, activeFilter]);

  useEffect(() => {
    if (isBrowser()) {
      const headerHeightOffset = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--header-height");

      let top = 0;

      if (headerHeightOffset) {
        top = parseInt(headerHeightOffset, 0);
      }

      if (window.scrollY < top) return;

      window.scrollTo({
        top,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [activeFilter, activeLayout]);

  useEffect(() => {
    if (!isBrowser()) return;

    return window.removeEventListener("mousemove", handleListHover);
  }, []);

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

  return (
    <div className={styles.container}>
      <GalleryToolbar
        initialFilter={initialFilter}
        emitFilter={setActiveFilter}
        emitLayout={setActiveLayout}
        emitFilterIsChanging={setFilterIsChanging}
      />

      {activeLayout === "map" ? (
        <CustomMap data={locationData} />
      ) : (
        <div
          className={`${
            activeLayout === "grid"
              ? styles.grid
              : activeLayout === "list"
              ? styles.list
              : styles.map
          } ${filterIsChanging ? styles.animating : ""}`}
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
                <Link key={item.title} to={path} data-index={index}>
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
