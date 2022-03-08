import React, { useState } from "react";
import * as styles from "./gallery-image.module.scss";
import { getPath, getPlaceholderPath } from "../../utils";

const CLOUDINARY_FULL_QUERY = "w_600,c_limit,q_75,f_auto";

const GalleryImage = ({ alt, url }) => {
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

export default GalleryImage;
