import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import DrawingsList from "components/DrawingsList";

export default function DrawingsForDay({ drawingsForDay, date }) {
  const title = `Coronamaison: Tous les dessins du ${date}`;
  const description = `Découvrez tous les dessins Coronamaison du ${date}, #coronamaison`;
  const socialImage = `https://coronamaison.now.sh/drawings/${drawingsForDay[0].source}-${drawingsForDay[0].id}-1026.jpg`;

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
        {drawingsForDay.length} dessins le {date}
      </h2>

      <DrawingsList drawings={drawingsForDay} />
    </>
  );
}

DrawingsForDay.propTypes = {
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.string,
};

export async function getStaticProps({ params: { year, month, day } }) {
  const fs = require("fs");
  const drawingsForDay = require(`data/${year}-${month}-${day}.json`).map(
    (drawing) => {
      const svg = fs.readFileSync(
        `public/thumbnails/${drawing.source}-${drawing.id}.svg`,
        "utf8",
      );
      delete drawing.originalImage;
      delete drawing.date;
      drawing.svg = svg;
      return drawing;
    },
  );

  return {
    props: {
      drawingsForDay,
      date: `${day}/${month}/${year}`,
    },
  };
}

export async function getStaticPaths() {
  const allDates = require("data/allDates.json");

  return {
    paths: allDates.map((date) => {
      return {
        params: { year: date.year, month: date.month, day: date.day },
      };
    }),
    fallback: false,
  };
}
