import * as React from "react";
import { Link } from "gatsby";

const generateGalleryImagePath = path => {
  // https://res.cloudinary.com/r-breslin/image/upload/v1584241866/r-breslin-cloudinary/WORK/MASKS/the-foyle/the-foyle_the-foyle-01_wekais.png
  if (!path) {
    console.error("Project has no images");
  }

  const parts = path.split("upload/");
  const transformationQuery = "w_400,q_auto,f_auto";

  return `${parts[0]}upload/${transformationQuery}/${parts[1]}`;
};

const Gallery = ({ data }) => {
  console.log("gallery data", data);
  return (
    <div>
      {data
        .filter(d => !d.draft)
        .map(({ frontmatter: item, path }) => (
          <Link key={item.title} to={path}>
            <figure>
              <img
                src={generateGalleryImagePath(item.images[0])}
                alt={item.title}
              />
            </figure>
            <h3>{item.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default Gallery;
