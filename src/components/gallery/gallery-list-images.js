import * as React from "react";
import * as styles from "./gallery-list-images.module.scss";

const buildCloudinaryQuery = (path, query) => {
  const parts = path.split("upload/");

  return `${parts[0]}upload/${query}/${parts[1]}`;
};

const generateListImage = path => {
  if (!path) {
    console.error("Project has no images");
  }

  return buildCloudinaryQuery(path, "c_fill,g_face,w_200,h_200,q_auto,f_auto");
};

const GalleryListImages = ({ data, active, filter }) => {
  return (
    <div className={styles.listimage}>
      {data &&
        data
          .filter(
            item => item.frontmatter.category === filter || filter === "all"
          )
          .map(({ frontmatter: item }, index) => (
            <img
              src={generateListImage(item.images[0])}
              alt={item.title}
              key={item.title}
              style={{
                visibility: index == active ? "visible" : "hidden",
              }}
            />
          ))}
    </div>
  );
};

export default GalleryListImages;
