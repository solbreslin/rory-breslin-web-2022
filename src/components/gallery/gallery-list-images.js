import * as React from "react";
import * as styles from "./gallery-list-images.module.scss";
import { buildCloudinaryPath } from "./../../utils";

const generateListImage = path => {
  if (!path) {
    console.error("Project has no images");
  }

  return buildCloudinaryPath(path, "w_320,q_auto,f_auto");
};

const GalleryListImages = ({ data, active, filter }) => {
  return (
    <div className={styles.listimage}>
      <div>
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
                  visibility:
                    index === parseInt(active, 10) ? "visible" : "hidden",
                }}
              />
            ))}
      </div>
    </div>
  );
};

export default GalleryListImages;
