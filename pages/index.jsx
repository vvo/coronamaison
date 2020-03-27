import React from "react";
import PropTypes from "prop-types";

import DrawingsList from "components/DrawingsList";
import Head from "next/head";

export default function Home({ top20Drawings }) {
  const title = "#coronamaison: Tous les dessins du hashtag #coronamaison";
  const description =
    "Ce site contient tous les dessins du hashtag #coronamaison publiés sur les réseaux sociaux. Ils sont organisés par date et popularité. Découvrez-les !";
  const url = "https://coronamaison.now.sh";
  const socialImage = `${url}/social.jpg`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={socialImage} />
      </Head>

      <h2 className="text-underline text-3xl font-cursive text-center">
        #coronamaisons les plus partagées
      </h2>

      <DrawingsList drawings={top20Drawings} />
    </>
  );
}

Home.propTypes = {
  top20Drawings: PropTypes.arrayOf(PropTypes.object),
};

export async function getStaticProps() {
  const top20Drawings = require("data/top20Drawings.json");

  return {
    props: {
      top20Drawings,
    },
  };
}
