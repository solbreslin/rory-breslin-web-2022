import React from "react";
import Layout from "./../components/layout";

import * as contactPageStyles from "./contact.module.scss";

const ContactPage = () => {
  return (
    <Layout>
      <section className={contactPageStyles.container}>
        <p>Contact page works</p>
      </section>
    </Layout>
  );
};

export default ContactPage;
