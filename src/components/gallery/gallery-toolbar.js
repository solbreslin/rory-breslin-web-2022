import React, { useRef, useState, useEffect } from "react";
import * as styles from "./gallery-toolbar.module.scss";

import Icons from "./icons";
import ChevronIcon from "./../chevron-icon";

import { titleCase, addToStorage } from "./helpers";

const filters = ["all", "portrait", "public", "masks", "exhibition"];
const layouts = ["grid", "list", "map"];

const GalleryToolbar = ({
  initialFilter,
  emitFilter,
  emitLayout,
  isLoading,
  clearFiltersReceiverCreator,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const toolbarRef = useRef(null);

  const onFilterChange = (filter = "all") => {
    setToolbarOpen(false);
    setActiveFilter(filter);
    addToStorage("rb-filter", filter);
  };

  const onLayoutChange = layout => {
    setToolbarOpen(false);
    setActiveLayout(layout);
    addToStorage("rb-layout", layout);
  };

  clearFiltersReceiverCreator(onFilterChange);

  useEffect(() => {
    const filter = localStorage.getItem("rb-filter");
    const layout = localStorage.getItem("rb-layout");

    if (initialFilter) {
      // Filter comes from router state (click from home page)
      // Need to store the new filter in localstorage etc
      onFilterChange(initialFilter);
    } else if (filter) {
      // Filter comes from page load/refresh
      // Already in storage
      setActiveFilter(filter);
    }

    if (layout) {
      setActiveLayout(layout);
    }
  }, [initialFilter]);

  useEffect(() => {
    emitFilter(activeFilter);
  }, [activeFilter, emitFilter]);

  useEffect(() => {
    emitLayout(activeLayout);
  }, [activeLayout, emitLayout]);

  useEffect(() => {
    // Need the height of the toolbar to correctly position the list image box
    if (toolbarRef && toolbarRef.current) {
      document.documentElement.style.setProperty(
        "--rb-toolbar-height",
        toolbarRef.current.offsetHeight + "px"
      );
    }
  }, []);

  return (
    <div
      className={`${styles.toolbarWrapper} ${isLoading ? styles.loading : ""}`}
      ref={toolbarRef}
    >
      <button
        className={`${styles.toolbarToggle} ${
          toolbarOpen ? styles.isActive : ""
        }`}
        onClick={() => setToolbarOpen(!toolbarOpen)}
      >
        <span className={styles.filterText}>Filter by</span>
        <span className={styles.activeFilterText}>{activeFilter}</span>
        <ChevronIcon direction={toolbarOpen ? "up" : "down"} />
      </button>
      <div className={`${styles.toolbar} ${toolbarOpen ? styles.open : ""}`}>
        <h4 className="sr-only">Select a category</h4>
        <ul className={`${styles.filterList} `}>
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
                checked={filter === activeFilter ? true : false}
              />
              <label htmlFor={filter}>{filter}</label>
            </li>
          ))}
        </ul>
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
