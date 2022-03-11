import React from "react";
import { Link } from "gatsby";
import * as styles from "./work-preview.module.scss";

import { useInView } from "react-intersection-observer";

const WorkPreviewLink = ({
  name,
  path,
  grid,
  gridSmall,
  images,
  orientation,
}) => {
  const { ref, inView, entry } = useInView({ threshold: 0.65 });

  return (
    <article ref={ref}>
      <Link to="work" state={{ filter: path }} className={styles.imageLink}>
        <h2 className={inView ? styles.visible : ""}>{name}</h2>
        <div
          className={`${styles.images} ${inView ? styles.visible : ""} ${
            orientation === "landscape" ? styles.landscape : styles.portrait
          }`}
          style={{ "--grid-columns": grid, "--grid-columns-small": gridSmall }}
        >
          {images.map(url => {
            return (
              <figure key={url}>
                <img src={url} alt={name} />
              </figure>
            );
          })}
        </div>
      </Link>
    </article>
  );
};

export default WorkPreviewLink;
