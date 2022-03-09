import React from "react";
import WorkPreviewLink from "./work-preview-link";
import * as styles from "./work-preview.module.scss";
import { buildCloudinaryPath } from "../../utils";

import data from "./data";

const CLOUDINARY_QUERY = "w_600,c_limit,q_80,f_auto";

const images = data.map(({ images }) => {
  return images.map(path => buildCloudinaryPath(path, CLOUDINARY_QUERY));
});

const WorkPreview = () => {
  return (
    <section className={`section ${styles.section}`}>
      <h1>Recent Work</h1>
      {data.map(({ name, path, grid }, index) => (
        <WorkPreviewLink
          key={path}
          name={name}
          path={path}
          grid={grid}
          images={images[index]}
        />
      ))}
    </section>
  );
};

export default WorkPreview;
