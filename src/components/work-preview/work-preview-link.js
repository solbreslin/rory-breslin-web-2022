import React from "react";
import { Link } from "gatsby";
import * as styles from "./work-preview.module.scss";

import { useInView } from "react-intersection-observer";

const WorkPreviewLink = ({ name, path, grid, images }) => {
  const { ref, inView, entry } = useInView({ threshold: 0.5 });

  return (
    <article ref={ref}>
      <Link to="work" state={{ filter: path }} className={styles.imageLink}>
        <div
          className={`${styles.images} ${inView ? styles.visible : ""}`}
          style={{ "--grid-columns": grid }}
        >
          {images.map(url => {
            return (
              <figure key={url}>
                <img src={url} alt={name} />
              </figure>
            );
          })}
        </div>
        <h2 className={inView ? styles.visible : ""}>{name}</h2>
      </Link>
    </article>
  );
};

export default WorkPreviewLink;
