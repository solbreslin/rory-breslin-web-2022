import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";

const ProjectPageTemplate = ({ data }) => {
  return (
    <>
      <Link to={"/"}>Back</Link>
      <h1>{data.title}</h1>

      {data.images.map((url, i) => (
        <div key={url}>
          <figure>
            <img src={data.images[i]} alt={data.title} />
          </figure>
        </div>
      ))}
    </>
  );
};

const ProjectPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProjectPageTemplate data={frontmatter} />
    </Layout>
  );
};

export default ProjectPage;

export const projectPageQuery = graphql`
  query ProjectPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
    }
  }
`;
