import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import DrawingsList from "components/DrawingsList";

export default function Home({ top50Drawings }) {
  const title = "CoronaMaison: Tous les dessins du hashtag #CoronaMaison";
  const description =
    "Ce site contient tous les dessins du hashtag #CoronaMaison publiés sur les réseaux sociaux. Ils sont organisés par date et popularité. Découvrez-les !";
  const url = "https://coronamaison.net";
  const socialImage = `${url}/social.jpg`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <h2 className="text-3xl font-cursive text-center">
        Top 50 des CoronaMaisons les plus partagées
      </h2>

      <DrawingsList drawings={top50Drawings} />
    </>
  );
}

Home.propTypes = {
  top50Drawings: PropTypes.arrayOf(PropTypes.object),
};

export async function getStaticProps() {
  const fs = require("fs");
  const top50Drawings = require("data/top50Drawings.json").map((drawing) => {
    const svg = fs.readFileSync(
      `public/thumbnails/${drawing.source}-${drawing.id}.svg`,
      "utf8",
    );
    delete drawing.originalImage;
    delete drawing.date;
    drawing.svg = svg;
    return drawing;
  });

  return {
    props: {
      top50Drawings,
    },
  };
}
