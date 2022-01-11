import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/layout";
import ArrowIcon from "../../components/arrow-icon";

import * as styles from "./work.module.scss";
import { EmblaCarousel } from "../../components/embla/embla-carousel";
import { isBrowser } from "../../utils";

const KeyCode = {
  ESCAPE: 27,
};

const useKeyPress = (targetKeyCode, callback) => {
  function downHandler(e) {
    if (e.which === targetKeyCode) {
      callback();
    }
  }

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("keydown", downHandler);
    }

    return () => {
      if (isBrowser()) {
        window.removeEventListener("keydown", downHandler);
      }
    };
  }, [targetKeyCode, downHandler]);
};

const ProjectPage = ({ data }) => {
  const [carouselIndex, setCarouselIndex] = useState(null);
  const { frontmatter: project } = data.markdownRemark;
  console.log(data);
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

  return (
    <Layout invert={true}>
      <section className={styles.container}>
        {/* <Link to={"/work"}>Back</Link> */}
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
        <Link to={"/"}>
          <ArrowIcon direction="left" /> Prev
        </Link>
        <Link to={"/"}>
          Next <ArrowIcon />
        </Link>
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
