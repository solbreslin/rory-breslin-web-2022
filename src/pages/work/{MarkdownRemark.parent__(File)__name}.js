import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";

const ProjectPage = ({ data }) => {
  console.log(data);
  const { frontmatter: project } = data.markdownRemark;

  return (
    <Layout>
      <Link to={"/work"}>Back</Link>
      <h1>{project.title}</h1>

      {project.images.map((url, i) => (
        <div key={url}>
          <figure>
            <img src={project.images[i]} alt={project.title} />
          </figure>
        </div>
      ))}
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
