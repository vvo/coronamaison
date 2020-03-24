import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import ProgressiveImage from "react-progressive-graceful-image";
import TwitterIcon from "../../../../svg/twitter.svg?sprite";
import Line from "../../../../svg/line.svg?sprite";

export default function Day({ drawingsForDay, formattedDate, allDates }) {
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

        <nav className="col-span-2 hidden sm:block">
          <h2 className="text-underline text-3xl font-cursive">Jours :</h2>
          <a
            className="block text-xl text-blue-800 font-cursive"
            href="http://www.google.fr"
          >
            23/03/2020 <sup>(+20)</sup>
          </a>
          <a
            className="block text-xl text-blue-800 font-cursive"
            href="http://www.google.fr"
          >
            22/03/2020 <sup>(+30)</sup>
          </a>
          <a
            className="block text-xl text-blue-800 font-cursive"
            href="http://www.google.fr"
          >
            21/03/2020 <sup>(+1)</sup>
          </a>
        </nav>

        <main className="col-span-12 sm:col-span-10">
          <h2 className="text-underline text-3xl font-cursive text-center">
            Dessins du 23/03/2020 :
          </h2>

          <DrawingsList
            drawingsForDay={drawingsForDay}
            formattedDate={formattedDate}
          />
        </main>
        <footer className="sm:col-start-3 col-span-12 sm:col-span-10"></footer>
      </div>
    </div>
  );
}

function DrawingsList({ drawingsForDay, formattedDate }) {
  return (
    <>
      {drawingsForDay.map((drawingData) => (
        <Drawing
          {...drawingData}
          formattedDate={formattedDate}
          key={`${drawingData.source}-${drawingData.id}`}
        />
      ))}
    </>
  );
}

DrawingsList.propTypes = {
  drawingsForDay: PropTypes.arrayOf(PropTypes.object),
  formattedDate: PropTypes.string,
};

function Drawing({ id, source, text, username, formattedDate, image }) {
  const DrawingImage = require(`../../../../drawings/${formattedDate}/${source}-${id}.jpg?trace`);
  const url = `https://twitter.com/${username}/status/${id}`;

  return (
    <>
      <a
        className="inline-block mt-6 text-lg text-blue-800 hover:text-twitter"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProgressiveImage delay={300} placeholder="" src={image}>
          {(src, loading) => {
            if (loading) {
              return <img src={DrawingImage.trace} />;
            }

            if (src) {
              return <img src={src} alt="an image" />;
            }

            return (
              <noscript>
                <img src={image} />
              </noscript>
            );
          }}
        </ProgressiveImage>
        <div className="mt-5">
          <TwitterIcon className="h-10 inline-block" /> @{username} : « {text} »
        </div>
      </a>

      <Line className="text-yellow-700 h-2 opacity-50 my-6 mx-auto" />
    </>
  );
}

Drawing.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  text: PropTypes.string,
  username: PropTypes.string,
  image: PropTypes.string,
  formattedDate: PropTypes.string,
};

export async function getStaticProps({ params }) {
  const formattedDate = `${params.year}-${params.month}-${params.day}`;
  const drawingsForDay = require(`../../../../data/${formattedDate}.json`);
  // const allDates =

  return {
    props: {
      drawingsForDay,
      formattedDate,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { year: "2020", month: "03", day: "22" } },
      { params: { year: "2020", month: "03", day: "23" } },
    ],
    fallback: false,
  };
}
