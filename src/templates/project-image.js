import React, { useState } from "react";
import * as styles from "./project-image.module.scss";
import { getPlaceholderPath, getPath } from "../utils";

const CLOUDINARY_FULL_QUERY = "q_100,f_auto";

const ProjectImage = ({ alt, url }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`${loaded ? styles.loaded : ""} ${styles.figure}`}>
      <img
        className={styles.full}
        src={getPath(url, CLOUDINARY_FULL_QUERY)}
        alt={alt}
        onLoad={() => setLoaded(true)}
      />
      <img
        src={getPlaceholderPath(url)}
        alt={alt}
        className={styles.placeholder}
      />
    </figure>
  );
};

export default ProjectImage;
