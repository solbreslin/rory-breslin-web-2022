import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import CustomMap from "./../map/map";
import * as styles from "./gallery.module.scss";
import { isBrowser } from "./../../utils/index";
import Icons from "./icons";
import ChevronIcon from "./../chevron-icon";
import GalleryImage from "./gallery-image";
import GalleryListImages from "./gallery-list-images";

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

const titleCase = str => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

const filters = ["all", "portrait", "public", "masks", "exhibition"];
const layouts = ["grid", "list"];

const Gallery = ({ category, layout, data }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  // UX improvement - instantly update toolbar on change
  const [tempActiveFilter, setTempActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [locationData, setLocationData] = useState([]);
  const [imageHovered, setImageHovered] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterIsChanging, setFilterIsChanging] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const toolbarRef = useRef(null);

  useEffect(() => {
    const filter = localStorage.getItem("rb-filter");
    const layout = localStorage.getItem("rb-layout");

    if (filter) {
      setActiveFilter(filter);
    }

    if (layout) {
      setActiveLayout(layout);
    }

    getToolbarHeight();
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

  const onFilterChange = filter => {
    setFiltersOpen(false);
    setFilterIsChanging(true);

    // This is used to immediately update the toolbar so no lag
    setTempActiveFilter(filter);

    const animationTime = activeLayout === "grid" ? 200 : 0;
    // Wrap in a timeout to allow animation
    setTimeout(() => {
      setActiveFilter(filter);
      setTempActiveFilter(null);

      try {
        localStorage.setItem("rb-filter", filter);
      } catch (error) {}
    }, animationTime);

    setTimeout(() => {
      setFilterIsChanging(false);
    }, animationTime * 2);
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

  function getToolbarHeight() {
    if (toolbarRef && toolbarRef.current) {
      setToolbarHeight(toolbarRef.current.offsetHeight);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar} ref={toolbarRef}>
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
                  (!tempActiveFilter && activeFilter === filter) ||
                  tempActiveFilter === filter
                    ? styles.activeFilter
                    : ""
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
          className={`${
            activeLayout === "grid"
              ? styles.grid
              : activeLayout === "list"
              ? styles.list
              : styles.map
          } ${filterIsChanging ? styles.animating : ""}`}
          onMouseEnter={e => handleMouseEnter(e)}
          onMouseLeave={e => handleMouseLeave(e)}
        >
          {activeLayout === "list" && (
            <GalleryListImages
              active={imageHovered}
              data={galleryData}
              filter={activeFilter}
              offset={toolbarHeight}
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
