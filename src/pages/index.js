import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import WorkPreview from "../components/work-preview/work-preview";
import AboutPreview from "../components/about-preview/about-preview";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Carousel />
    <div className="container">
      <WorkPreview />
      <AboutPreview />
    </div>
  </Layout>
);

export default IndexPage;
