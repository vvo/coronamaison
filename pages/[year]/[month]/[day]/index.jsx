import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import DrawingsList from "components/DrawingsList";

export default function DrawingsForDay({ drawingsForDay, date }) {
  return (
    <>
      <Head>
        <title>
          #coronamaison du {date.day}/{date.month}/{date.year}
        </title>
      </Head>

      <main className="col-span-12 sm:col-span-10">
        <h2 className="text-underline text-3xl font-cursive text-center">
          {drawingsForDay.length} dessins le {date.day}/{date.month}/{date.year}
        </h2>

        <DrawingsList drawings={drawingsForDay} />
      </main>
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
  const drawingsFolder = `${year}-${month}-${day}`;
  const drawingsForDay = require(`data/${drawingsFolder}.json`);

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
