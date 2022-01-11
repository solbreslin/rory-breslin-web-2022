import React, { useEffect } from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import WorkPreview from "../components/work-preview/work-preview";

import AboutPreview from "../components/about-preview/about-preview";

const IndexPage = () => {
  useEffect(() => {
    const onScroll = e => {
      const { scrollTop } = e.target.documentElement;

      document.documentElement.style.setProperty("--scroll-y", scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.setProperty("--scroll-y", 0);
    };
  }, []);

  return (
    <Layout invert={true}>
      <Seo title="Home" />
      <Carousel />
      <div className="container">
        <WorkPreview />
        <AboutPreview />
      </div>
    </Layout>
  );
};

export default IndexPage;
