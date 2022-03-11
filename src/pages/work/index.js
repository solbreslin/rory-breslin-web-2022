import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/layout";
import Gallery from "../../components/gallery/gallery";
import Seo from "../../components/seo";

import * as styles from "./work.module.scss";

const WorkPage = ({ location, data }) => {
  const filter = location && location.state ? location.state.filter : null;

  return (
    <Layout>
      <Seo title="Work" />
      <h1 className={styles.heading}>Work</h1>
      <Gallery initialFilter={filter} data={data.allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default WorkPage;

export const workPageQuery = graphql`
  query WorkPage {
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
      }
    }
  }
`;
