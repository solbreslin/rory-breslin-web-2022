import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import ArrowIcon from "../components/arrow-icon";

import * as styles from "./project-page.module.scss";
import { EmblaCarousel } from "../components/embla/embla-carousel";
import { isBrowser } from "../utils";

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
    document.body.classList.add("theme-dark");
  }, []);

  useEffect(() => {
    return () => {
      if (isBrowser()) {
        document.body.style.removeProperty("overflow");
        document.body.classList.remove("theme-dark");
      }
    };
  }, []);

  useKeyPress(KeyCode.ESCAPE, closeCarousel);

  const filter = localStorage.getItem("rb-filter");
  const nextPage =
    filter && filter !== "all"
      ? pageContext.nextPathInCategory
      : pageContext.nextPath;

  return (
    <Layout invert={true}>
      <section className={styles.container}>
        <Link to={"/work"}>
          <ArrowIcon direction="left" /> All work
        </Link>
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
            <figure>
              <img src={project.images[i]} alt={project.title} />
            </figure>
          </div>
        ))}
      </section>
      <section className={`${styles.container} ${styles.nav}`}>
        {nextPage && (
          <Link to={"/work/" + nextPage}>
            Next <ArrowIcon />
          </Link>
        )}
      </section>

      {carouselIndex != null && (
        <>
          <button className="close-button" onClick={() => closeCarousel()}>
            <span className="sr-only">Close</span>
          </button>
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
