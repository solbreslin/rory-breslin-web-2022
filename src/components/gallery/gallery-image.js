import React from "react";
import * as styles from "./gallery-image.module.scss";
import { getPath } from "../../utils";

const CLOUDINARY_FULL_QUERY = "w_600,c_limit,q_75,f_auto";

const GalleryImage = ({ alt, url }) => {
  return (
    <figure className={`${styles.figure}`}>
      <img src={getPath(url, CLOUDINARY_FULL_QUERY)} alt={alt} />
    </figure>
  );
};

export default GalleryImage;
