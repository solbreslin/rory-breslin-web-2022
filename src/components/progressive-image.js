import React, { useState, useEffect } from "react";
import * as styles from "./progressive-image.module.scss";

// Eg: https://res.cloudinary.com/r-breslin/image/upload/v1584241866/r-breslin-cloudinary/WORK/MASKS/the-foyle/the-foyle_the-foyle-01_wekais.png

const buildCloudinaryQuery = (path, query) => {
  const parts = path.split("upload/");

  return `${parts[0]}upload/${query}/${parts[1]}`;
};

const getPath = path => {
  return buildCloudinaryQuery(path, "q_100,f_auto");
};

const getPlaceholderPath = path => {
  return buildCloudinaryQuery(path, "w_10,q_auto,f_auto");
};

const ProgressiveImage = ({ alt, url, height, carousel }) => {
  const [loaded, setLoaded] = useState(false);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    if (height) {
      setStyle({
        height: height,
      });
    }
  }, [height]);

  return (
    <figure
      className={`${loaded ? styles.loaded : ""} ${
        carousel ? styles.carousel : ""
      } ${styles.figure}`}
      style={style}
    >
      <img
        className={styles.full}
        src={getPath(url)}
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

export default ProgressiveImage;
