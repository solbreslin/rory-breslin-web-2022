import React, { useState } from "react";
import { Link } from "gatsby";

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

const Gallery = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const galleryData = mapData(data);

  return (
    <div className="gallery">
      <div className="gallery-filters">
        {
          <ul>
            {filters.map(filter => (
              <li
                key={filter}
                className={`${activeFilter === filter ? "is-active" : ""}`}
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
      {galleryData
        .filter(
          item =>
            item.frontmatter.category === activeFilter || activeFilter === "all"
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
  );
};

export default Gallery;
