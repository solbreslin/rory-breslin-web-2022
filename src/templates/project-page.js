import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import ArrowIcon from "../components/arrow-icon";

import * as styles from "./project-page.module.scss";
import { EmblaCarousel } from "../components/embla/embla-carousel";
import { isBrowser } from "../utils";
import ProjectImage from "./project-image";
import CloseButton from "../components/embla/close-button";

const KeyCode = {
  ESCAPE: 27,
};

const useKeyPress = (targetKeyCode, callback) => {
  useEffect(() => {
    function downHandler(e) {
      if (e.which === targetKeyCode) {
        callback();
      }
    }
    if (isBrowser()) {
      window.addEventListener("keydown", downHandler);
    }

    return () => {
      if (isBrowser()) {
        window.removeEventListener("keydown", downHandler);
      }
    };
  }, [targetKeyCode, callback]);
};

const ProjectPage = ({ data, pageContext }) => {
  const [carouselIndex, setCarouselIndex] = useState(null);
  const [next, setNext] = useState({});
  const { frontmatter: project } = data.markdownRemark;

  const closeCarousel = () => {
    setCarouselIndex(null);
    isBrowser() && document.body.style.removeProperty("overflow");
  };

  const onImageClick = index => {
    setCarouselIndex(index);
    isBrowser() && (document.body.style.overflow = "hidden");
  };

  useEffect(() => {
    const getNextPath = () => {
      let filter = null;

      if (isBrowser()) {
        filter = localStorage.getItem("rb-filter");
      }

      const { next } = pageContext;

      // User lands on the page with no filter set (e.g. sent the link)
      if (!filter) {
        return {
          path: next.path,
          title: next.title,
        };
      }

      // Filter set
      if (filter && filter !== "all") {
        // Check if there is a next item
        if (next.path_in_category && next.title_in_category) {
          return {
            path: next.path_in_category,
            title: next.title_in_category,
          };
        }
      }

      // Filter set but set to 'all'
      if (filter && filter === "all") {
        return {
          path: next.path,
          title: next.title,
        };
      }
    };

    const nextPath = getNextPath();

    setNext(nextPath);
  }, []);

  useEffect(() => {
    return () => {
      if (isBrowser()) {
        document.body.style.removeProperty("overflow");
      }
    };
  }, []);

  useKeyPress(KeyCode.ESCAPE, closeCarousel);

  return (
    <Layout>
      <section className={styles.container}>
        {/* <Link to={"/work"}>
          <ArrowIcon direction="left" /> All work
        </Link> */}
        <h1>{project.title}</h1>
        <h4>
          {project.material}
          <br />
          {project.year}
        </h4>
        {project.images.map((url, i) => (
          <div
            key={url}
            onClick={() => onImageClick(i)}
            onKeyPress={event => event.key === "Enter" && onImageClick(i)}
            role="button"
            tabIndex="0"
          >
            <ProjectImage url={project.images[i]} alt={project.title} />
          </div>
        ))}
      </section>
      <section className={`${styles.container} ${styles.nav}`}>
        <Link to={"/work"} className={styles.underline}>
          All projects
        </Link>
        {next && (
          <Link to={"/work/" + next.path}>
            <span className={styles.nextProjectText}>Next project</span>
            <span>
              <span className={styles.underline}>{next.title}</span>
              <ArrowIcon />
            </span>
          </Link>
        )}
      </section>

      {carouselIndex != null && (
        <>
          <CloseButton action={closeCarousel} />
          <EmblaCarousel
            visible={carouselIndex != null}
            images={project.images}
            index={carouselIndex}
          />
        </>
      )}
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
