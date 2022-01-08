import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import CustomMap from "./../map/map";
import * as styles from "./gallery.module.scss";
import arrowIcon from "../arrow-icon";
import { isBrowser } from "./../../utils/index";
import Icons from "./icons";
import ChevronIcon from "./../chevron-icon";

// Filter out drafts and alphabetise on page load, not every render
let galleryData;

const filterDraftProjects = data => {
  return data.filter(item => !item.frontmatter.draft);
};

const sortAlphabetically = data => {
  return data.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
};

const mapData = data => {
  if (galleryData) return galleryData;

  galleryData = filterDraftProjects(data);
  galleryData = sortAlphabetically(galleryData);

  return galleryData;
};

const setInitialImageLoadingState = len => {
  const images = [];

  for (let i = 0; i < len; i++) {
    // 0 is 'NOT_LOADED'
    // 1 is 'LOADED'
    images.push(0);
  }

  return images;
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

const buildImagePath = (path, query) => {
  const parts = path.split("upload/");

  return `${parts[0]}upload/${query}/${parts[1]}`;
};

const generateGalleryImagePath = path => {
  // Eg: https://res.cloudinary.com/r-breslin/image/upload/v1584241866/r-breslin-cloudinary/WORK/MASKS/the-foyle/the-foyle_the-foyle-01_wekais.png
  if (!path) {
    console.error("Project has no images");
  }

  return buildImagePath(path, "q_50,f_auto");
};

const generatePlaceholderGalleryImagePath = path => {
  if (!path) {
    console.error("Project has no images");
  }

  return buildImagePath(path, "w_10,q_auto,f_auto");
};

const generateListImage = path => {
  if (!path) {
    console.error("Project has no images");
  }

  return buildImagePath(path, "c_fill,g_face,w_200,h_200,q_auto,f_auto");
};

const titleCase = str => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

const filters = ["all", "portrait", "public", "masks", "exhibition"];
const layouts = ["grid", "list"];

const Gallery = ({ category, layout, data }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [locationData, setLocationData] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const [imageHovered, setImageHovered] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const len = data.length;

  useEffect(() => {
    // Only do this once!
    setImagesLoaded(setInitialImageLoadingState(len));

    const filter = localStorage.getItem("rb-filter");
    const layout = localStorage.getItem("rb-layout");

    if (filter) {
      setActiveFilter(filter);
    }

    if (layout) {
      setActiveLayout(layout);
    }
  }, []);

  useEffect(() => {
    if (category) {
      setActiveFilter(category);
    }

    if (layout) {
      setActiveLayout(layout);
    }
  }, [category, layout]);

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

  function onImageLoad(imageIndex) {
    // All of this to change a value from false to true :0
    const images = imagesLoaded.map((item, index) =>
      imageIndex === index ? 1 : item
    );
    setImagesLoaded(images);
  }

  const onFilterChange = filter => {
    setActiveFilter(filter);
    setFiltersOpen(false);

    try {
      localStorage.setItem("rb-filter", filter);
    } catch (error) {}
  };

  const onLayoutChange = layout => {
    setActiveLayout(layout);

    try {
      localStorage.setItem("rb-layout", layout);
    } catch (error) {}
  };

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
      <div className={styles.toolbar}>
        <div className={styles.filterListWrapper}>
          <button onClick={() => setFiltersOpen(!filtersOpen)}>
            Filter: {activeFilter}
            <ChevronIcon direction={filtersOpen ? "up" : "down"} />
          </button>
          <h4 className="sr-only">Select a category</h4>
          <ul
            className={`${styles.filterList} ${filtersOpen ? styles.open : ""}`}
          >
            {filters.map(filter => (
              <li
                key={filter}
                className={`${
                  activeFilter === filter ? styles.activeFilter : ""
                } ${styles.filterItem}`}
              >
                <input
                  className="input-hidden"
                  id={filter}
                  name="filters"
                  type="radio"
                  onChange={() => onFilterChange(filter)}
                />
                <label htmlFor={filter}>{filter}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="sr-only">Select a layout</h4>
          <ul className={styles.layoutList}>
            {layouts.map(layout => (
              <li
                key={layout}
                className={`${
                  activeLayout === layout ? styles.activeLayout : ""
                } ${styles.layoutItem}`}
              >
                <input
                  className="input-hidden"
                  id={layout}
                  name="layouts"
                  type="radio"
                  onChange={() => onLayoutChange(layout)}
                />
                <label title={titleCase(layout)} htmlFor={layout}>
                  <span className="sr-only">{layout}</span>
                  <span className="icon">
                    {Icons[layout] && Icons[layout]()}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {activeLayout === "map" ? (
        <CustomMap data={locationData} />
      ) : (
        <div
          className={
            activeLayout === "grid"
              ? styles.grid
              : activeLayout === "list"
              ? styles.list
              : styles.map
          }
          onMouseEnter={e => handleMouseEnter(e)}
          onMouseLeave={e => handleMouseLeave(e)}
        >
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
                    <figure>
                      <img
                        src={generateGalleryImagePath(item.images[0])}
                        alt={item.title}
                        onLoad={() => onImageLoad(index)}
                      />
                      {!imagesLoaded[index] && (
                        <img
                          src={generatePlaceholderGalleryImagePath(
                            item.images[0]
                          )}
                          alt={item.title}
                          className={styles.placeholder}
                        />
                      )}
                    </figure>
                  )}
                  <h3>
                    {item.title} {activeLayout === "grid" && arrowIcon()}
                  </h3>
                  {activeLayout === "list" && <span>{item.year}</span>}
                </Link>
              ))}
          <div className={styles.listimage}>
            {galleryData &&
              galleryData
                .filter(
                  item =>
                    item.frontmatter.category === activeFilter ||
                    activeFilter === "all"
                )
                .map(({ frontmatter: item }, index) => (
                  <img
                    src={generateListImage(item.images[0])}
                    alt={item.title}
                    key={item.title}
                    style={{
                      visibility: index == imageHovered ? "visible" : "hidden",
                    }}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
