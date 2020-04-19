import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { useRouter } from "next/router";
import DrawingsList from "components/DrawingsList";
import Share from "components/Share";

export default function DrawingsForDay({ drawingsForDay, date, lang }) {
  const router = useRouter();

  const title = `CoronaMaison: All the drawing of ${date}`;
  const description = `Discover all the CoronaMaison drawing of ${date}`;
  const socialImage = `https://coronamaison.net/drawings/${drawingsForDay[0].source}-${drawingsForDay[0].id}-1026.jpg`;
  const url = `https://coronamaison.net/${router.asPath}`;

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
        {lang === 'en' ? `${drawingsForDay.length} drawings on ${date}` : `${drawingsForDay.length} dessins le ${date}` }
      </h2>

      <DrawingsList drawings={drawingsForDay} lang={`en`} />

      <Share url={url} title={title} description={description} lang={`en`} />
    </>
  );
}

DrawingsForDay.propTypes = {
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.string,
  lang: PropTypes.string,
};

export async function getStaticProps({ params: { year, month, day } }) {
  const fs = require("fs");
  const drawingsForDay = require(`data/${year}-${month}-${day}.json`).map(
    (drawing) => {
      const svg = fs.readFileSync(
        `public/thumbnails/${drawing.source}-${drawing.id}.svg`,
        "utf8",
      );
      delete drawing.date;
      drawing.svg = svg;
      return drawing;
    },
  );

  return {
    props: {
      drawingsForDay,
      date: `${day}/${month}/${year}`,
      lang: 'en'
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
