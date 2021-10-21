import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../../components/layout";
import Gallery from "../../components/gallery/gallery";
import Seo from "../../components/seo";

const WorkPage = ({ data }) => {
  console.log("work page data", data);
  return (
    <Layout>
      <Seo title="Page two" />
      <Gallery data={data.allMarkdownRemark.nodes} />
      <Link to="/">Go back to the homepage</Link>
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
        }
        path: gatsbyPath(
          filePath: "/work/{MarkdownRemark.parent__(File)__name}"
        )
      }
    }
  }
`;
