import React from "react";
import "../css/tailwind.css";
import PropTypes from "prop-types";
import Layout from "components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout lang={pageProps.lang || "fr"}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
