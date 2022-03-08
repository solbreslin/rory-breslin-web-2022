import React, { useRef, useState, useEffect } from "react";
import * as styles from "./gallery-toolbar.module.scss";

import Icons from "./icons";
import ChevronIcon from "./../chevron-icon";

const titleCase = str => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

const filters = ["all", "portrait", "public", "masks", "exhibition"];
const layouts = ["grid", "list"];

const GalleryToolbar = ({
  initialFilter,
  emitFilter,
  emitLayout,
  isLoading,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
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
  }, [emitFilter, emitLayout]);

  useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  useEffect(() => {
    emitFilter(activeFilter);
  }, [activeFilter, emitFilter]);

  useEffect(() => {
    emitLayout(activeLayout);
  }, [activeLayout, emitLayout]);

  const onFilterChange = filter => {
    setFiltersOpen(false);
    setActiveFilter(filter);

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

  useEffect(() => {
    const getToolbarHeight = () => {
      if (toolbarRef && toolbarRef.current) {
        document.documentElement.style.setProperty(
          "--toolbar-height",
          toolbarRef.current.offsetHeight
        );
      }
    };

    getToolbarHeight();
  }, []);

  return (
    <div
      className={`${styles.toolbar} ${isLoading ? styles.loading : ""}`}
      ref={toolbarRef}
    >
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
                <span className="icon">{Icons[layout] && Icons[layout]()}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GalleryToolbar;
