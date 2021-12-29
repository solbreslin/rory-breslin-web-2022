import React, { useEffect } from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Carousel from "../components/carousel/carousel";
import Gallery from "../components/gallery/gallery";
import { graphql } from "gatsby";

import AboutPreview from "../components/about-preview/about-preview";
import { isBrowser } from "../utils";

const IndexPage = ({ location, data }) => {
  const activeCategory =
    location && location.state ? location.state.category : null;

  useEffect(() => {
    if (location && location.state && location.state.goToWork) {
      if (isBrowser()) {
        const target = document.getElementById("scroll-target-work");

        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }

        location.state.goToWork = false;
      }
    }
  });

  return (
    <Layout>
      <Seo title="Home" />
      <Carousel />
      <div className="container">
        <span id="scroll-target-work"></span>
        <Gallery
          category={activeCategory}
          data={data.allMarkdownRemark.nodes}
        />
        <AboutPreview />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          draft
          title
          category
          description
          material
          year
          images
          location
          isHorizontal
        }
        path: gatsbyPath(
          filePath: "/work/{MarkdownRemark.parent__(File)__name}"
        )
      }
    }
  }
`;
