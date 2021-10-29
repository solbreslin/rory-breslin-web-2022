import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import { Link } from "gatsby";

const images = [
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1588380563/r-breslin-cloudinary/HOMEPAGE/Boxes/public_k6unkl.jpg",
    title: "Public art",
    category: "public",
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1588380529/r-breslin-cloudinary/HOMEPAGE/Boxes/portrait_zlgiad.jpg",
    title: "Portrait",
    category: "portrait",
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1588380436/r-breslin-cloudinary/HOMEPAGE/Boxes/masks_xo0ojk.jpg",
    title: "Masks",
    category: "masks",
  },
  {
    url: "https://res.cloudinary.com/r-breslin/image/upload/v1588380274/r-breslin-cloudinary/HOMEPAGE/Boxes/exhibition_tnz3lz.jpg",
    title: "Exhibition",
    category: "exhibition",
  },
];

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Carousel />
    <section>
      {images.map(image => (
        <Link to="work" key={image.title}>
          <figure>
            <img src={image.url} alt={image.title} />
          </figure>
          <h3>{image.title}</h3>
        </Link>
      ))}
    </section>
  </Layout>
);

export default IndexPage;
