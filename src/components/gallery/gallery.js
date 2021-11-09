import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import CustomMap from "./../map/map";
import * as styles from "./gallery.module.scss";

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

const generateGalleryImagePath = path => {
  // Eg: https://res.cloudinary.com/r-breslin/image/upload/v1584241866/r-breslin-cloudinary/WORK/MASKS/the-foyle/the-foyle_the-foyle-01_wekais.png
  if (!path) {
    console.error("Project has no images");
  }

  const parts = path.split("upload/");
  const transformationQuery = "w_400,q_auto,f_auto";

  return `${parts[0]}upload/${transformationQuery}/${parts[1]}`;
};

const filters = ["all", "portrait", "public", "masks", "exhibition"];
const layouts = ["grid", "list", "map"];

const Gallery = ({ category, layout, data }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLayout, setActiveLayout] = useState("grid");
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    if (category) {
      setActiveFilter(category);
    }

    if (layout) {
      setActiveLayout(layout);
    }
  }, [category, layout]);

  useEffect(() => {
    const galleryData = mapData(data);

    if (galleryData) {
      setLocationData(mapLocationData(galleryData, activeFilter));
    }
  }, [data, activeFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {
            <ul className={styles.filterList}>
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
                    onChange={() => setActiveFilter(filter)}
                  />
                  <label htmlFor={filter}>{filter}</label>
                </li>
              ))}
            </ul>
          }
        </div>
        <div className={styles.layouts}>
          {
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
                    onChange={() => setActiveLayout(layout)}
                  />
                  <label htmlFor={layout}>{layout}</label>
                </li>
              ))}
            </ul>
          }
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
        >
          {galleryData &&
            galleryData
              .filter(
                item =>
                  item.frontmatter.category === activeFilter ||
                  activeFilter === "all"
              )
              .map(({ frontmatter: item, path }) => (
                <Link key={item.title} to={path}>
                  <figure>
                    <img
                      src={generateGalleryImagePath(item.images[0])}
                      alt={item.title}
                    />
                  </figure>
                  <h3>{item.title}</h3>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
