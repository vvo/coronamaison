import React from "react";
import PropTypes from "prop-types";

import DrawingsList from "components/DrawingsList";
import Head from "next/head";

export default function Home({ top20Drawings, nbDrawings }) {
  return (
    <>
      <Head>
        <title>#coronamaison ({nbDrawings})</title>
      </Head>

      <main className="xl:col-span-10">
        <h2 className="text-underline text-3xl font-cursive text-center">
          #coronamaisons les plus partagées
        </h2>

        <DrawingsList drawings={top20Drawings} />
      </main>
    </>
  );
}

Home.propTypes = {
  top20Drawings: PropTypes.arrayOf(PropTypes.object),
  nbDrawings: PropTypes.number,
};

export async function getStaticProps() {
  const top20Drawings = require("data/top20Drawings.json");
  const { nbDrawings } = require("data/state.json");

  return {
    props: {
      top20Drawings,
      nbDrawings,
    },
  };
}
