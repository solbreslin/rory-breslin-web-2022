import * as React from "react";

import { Link } from "gatsby";
import * as styles from "./work-preview.module.scss";

import data from "./data";

const generateOptimisedPath = path => {
  const parts = path.split("/upload/");

  return `${parts[0]}/upload/q_70,f_auto/${parts[1]}`;
};

const WorkPreview = () => {
  const optimisedImages = data.map(({ images }) => {
    const { feature, collection } = images;

    return [
      generateOptimisedPath(feature),
      ...collection.map(c => generateOptimisedPath(c)),
    ];
  });

  return (
    <section className={styles.section}>
      <h1>Explore Work</h1>
      {data.map(({ name, path }, index) => (
        <article key={path}>
          <Link to="work" state={{ filter: path }} className={styles.imageLink}>
            <div className={styles.images}>
              {optimisedImages[index].map(url => {
                return (
                  <figure key={url}>
                    <img src={url} alt={name} />
                  </figure>
                );
              })}
            </div>
            <h2>{name}</h2>
          </Link>
        </article>
      ))}
    </section>
  );
};

export default WorkPreview;
