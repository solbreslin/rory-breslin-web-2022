import * as React from "react";

import { Link } from "gatsby";
import * as previewStyles from "./work-preview.module.scss";

const categories = [
  {
    image_url:
      "https://res.cloudinary.com/r-breslin/image/upload/v1588380563/r-breslin-cloudinary/HOMEPAGE/Boxes/public_k6unkl.jpg",
    name: "Public art",
    path: "public",
  },
  {
    image_url:
      "https://res.cloudinary.com/r-breslin/image/upload/v1588380529/r-breslin-cloudinary/HOMEPAGE/Boxes/portrait_zlgiad.jpg",
    name: "Portrait",
    path: "portrait",
  },
  {
    image_url:
      "https://res.cloudinary.com/r-breslin/image/upload/v1588380436/r-breslin-cloudinary/HOMEPAGE/Boxes/masks_xo0ojk.jpg",
    name: "Masks",
    path: "masks",
  },
  {
    image_url:
      "https://res.cloudinary.com/r-breslin/image/upload/v1588380274/r-breslin-cloudinary/HOMEPAGE/Boxes/exhibition_tnz3lz.jpg",
    name: "Exhibition",
    path: "exhibition",
  },
];

const WorkPreview = () => (
  <section className={previewStyles.section}>
    <h1>Explore Work</h1>
    {categories.map(category => (
      <article key={category.path}>
        <Link
          to="work"
          state={{ filter: category.path }}
          className={previewStyles.imageLink}
        >
          <figure>
            <img src={category.image_url} alt={category.name} />
          </figure>
          <h2>{category.name}</h2>
        </Link>
      </article>
    ))}
  </section>
);

export default WorkPreview;
