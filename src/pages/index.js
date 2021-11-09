import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import WorkPreview from "../components/work-preview/work-preview";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Carousel />
    <WorkPreview />
  </Layout>
);

export default IndexPage;
