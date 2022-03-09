import * as React from "react";

import * as styles from "./about-preview.module.scss";
import content from "./data";

const AboutPreview = () => (
  <section className={styles.section}>
    <div className="section">
      {content.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  </section>
);

export default AboutPreview;
