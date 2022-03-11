import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import WorkPreview from "../components/work-preview/work-preview";

import AboutPreview from "../components/about-preview/about-preview";

import { isBrowser } from "./../utils/index";

const IndexPage = () => {
  const [wh, setWh] = useState(0);

  useEffect(() => {
    isBrowser() && setWh(window.innerHeight);
  }, [wh]);

  useEffect(() => {
    /**
     * Adds a scroll listener which updates a CSS variable
     * This is used by the home page carousel component
     */
    const onScroll = e => {
      if (!e || !e.target || !e.target.documentElement) return;

      const { scrollTop } = e.target.documentElement;

      // Don't need to set the variable if the carousel is out of the viewport
      if (scrollTop > wh) {
        return;
      }

      document.documentElement.style.setProperty("--scroll-y", scrollTop);
    };

    isBrowser() && window.addEventListener("scroll", onScroll);

    return () => {
      if (isBrowser()) {
        window.removeEventListener("scroll", onScroll);
        document.documentElement.style.setProperty("--scroll-y", 0);
      }
    };
  }, [wh]);

  return (
    <Layout index={true}>
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
