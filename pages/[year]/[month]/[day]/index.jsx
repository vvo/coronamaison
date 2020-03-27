import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import DrawingsList from "components/DrawingsList";

export default function DrawingsForDay({ drawingsForDay, date }) {
  const formattedDate = `${date.day}/${date.month}/${date.year}`;
  const title = `#coronamaison: Tous les dessins du ${formattedDate}`;
  const description = `Découvrez tous les dessins #coronamaison du ${formattedDate}`;
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
        {drawingsForDay.length} dessins le {date.day}/{date.month}/{date.year}
      </h2>

      <DrawingsList drawings={drawingsForDay} />
    </>
  );
}

DrawingsForDay.propTypes = {
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
  }),
};

export async function getStaticProps({ params: { year, month, day } }) {
  const date = { year, month, day };
  const drawingsForDay = require(`data/${year}-${month}-${day}.json`);

  return {
    props: {
      drawingsForDay,
      date,
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
