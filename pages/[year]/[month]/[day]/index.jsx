import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import ProgressiveImage from "react-progressive-graceful-image";
import TwitterIcon from "../../../../svg/twitter.svg?sprite";
import Line from "../../../../svg/line.svg?sprite";
import Link from "next/link";

export default function Day({ drawingsForDay, date, allDates }) {
  return (
    <div className="container mx-auto px-5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-12 gap-2">
        <h1 className="font-cursive text-4xl sm:text-6xl text-center text-blue-800 col-span-12 sm:col-span-10 sm:col-start-3 ">
          <a href="/">#coronamaison</a>
        </h1>

        <Menu allDates={allDates} />

        <main className="col-span-12 sm:col-span-10">
          <h2 className="text-underline text-3xl font-cursive text-center">
            {drawingsForDay.length} dessins le {date.day}/{date.month}/
            {date.year}
          </h2>

          {/* <div className="grid grid-cols-3"> */}
          <div>
            <DrawingsList drawingsForDay={drawingsForDay} date={date} />
          </div>
        </main>
        <footer className="sm:col-start-3 col-span-12 sm:col-span-10"></footer>
      </div>
    </div>
  );
}

Day.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
  }),
};

function DrawingsList({ drawingsForDay, date }) {
  return drawingsForDay.map((drawingData) => (
    <Drawing
      {...drawingData}
      date={date}
      key={`${drawingData.source}-${drawingData.id}`}
    />
  ));
}

DrawingsList.propTypes = {
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
  }),
};

function Drawing({ id, source, username, image }) {
  const DrawingThumbnail = require(`../../../../public/thumbnails/${source}-${id}.svg?original`);
  const url = `https://twitter.com/${username}/status/${id}`;

  return (
    <div>
      <a
        className="block mt-6 text-lg text-blue-800 hover:text-twitter"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProgressiveImage delay={300} placeholder="" src={image}>
          {(src, loading) => {
            if (loading) {
              // return <img style={{ height: "10rem" }} src={image} />;
              return <img src={DrawingThumbnail} />;
            }

            if (src) {
              return (
                // <img style={{ height: "10rem" }} src={src} alt="an image" />
                <img src={src} alt="an image" />
              );
            }

            return (
              <noscript>
                <img src={image} />
              </noscript>
            );
          }}
        </ProgressiveImage>
        <div className="mt-5">
          <TwitterIcon className="h-10 inline-block" /> @{username}
        </div>
      </a>

      {/* <button
        className="text-3xl"
        onClick={async () => {
          await fetch(`/api/drawing/${id}`);
        }}
      >
        delete
      </button> */}

      <Line className="text-yellow-700 h-2 opacity-50 my-6 mx-auto" />
    </div>
  );
}

Drawing.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  username: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
  }),
};

function Menu({ allDates }) {
  return (
    <nav className="col-span-2 hidden sm:block">
      <h2 className="text-underline text-3xl font-cursive">Jours :</h2>
      {allDates.map((date) => (
        <MenuItem date={date} key={JSON.stringify(date)} />
      ))}
    </nav>
  );
}

Menu.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
};

function MenuItem({ date: { day, month, year, nbDrawings } }) {
  return (
    <Link href="/[year]/[month]/[day]" as={`/${year}/${month}/${day}`}>
      <a className="block text-xl text-blue-800 font-cursive">
        {day}/{month}/{year} <sup>(+{nbDrawings})</sup>
      </a>
    </Link>
  );
}

MenuItem.propTypes = {
  date: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    nbDrawings: PropTypes.number,
  }),
};

export async function getStaticProps({ params: { year, month, day } }) {
  const date = { year, month, day };
  const drawingsFolder = `${year}-${month}-${day}`;
  const drawingsForDay = require(`../../../../data/${drawingsFolder}.json`);
  const allDates = require("../../../../data/allDates.json");

  return {
    props: {
      drawingsForDay,
      date,
      allDates,
    },
  };
}

export async function getStaticPaths() {
  const allDates = require("../../../../data/allDates.json");

  return {
    paths: allDates.map((date) => {
      return {
        params: { year: date.year, month: date.month, day: date.day },
      };
    }),
    fallback: false,
  };
}
