import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import TweetEmbed from "react-tweet-embed";
import { useRouter } from "next/router";

import { DateTime } from "luxon";
import DrawingItem from "components/DrawingItem";
import Share from "components/Share";
import HandDrawnLine from "svg/HandDrawnLine.svg";

export default function Drawing({
  id,
  source,
  username,
  imageWidth,
  imageHeight,
  likes,
  svg,
  formattedDate,
}) {
  const router = useRouter();

  const title = `CoronaMaison de ${username} publiée le ${formattedDate}`;
  const description = `Voici le dessin CoronaMaison de ${username} publié sur Twitter le ${formattedDate}. Vous trouverez aussi le coloriage associé et un lien vers le tweet d'origine`;
  const socialImage = `https://coronamaison.net/drawings/twitter-${id}-1026.jpg`;
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
        CoronaMaison de {username} publiée le {formattedDate}
      </h2>

      <DrawingItem
        id={id}
        source={source}
        username={username}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        likes={likes}
        svg={svg}
        withColoringPage={false}
        linkToImage={true}
      />

      <h2 className="text-3xl font-cursive text-center my-6">
        Version à colorier
      </h2>

      <a
        href={`/coloringPages/twitter-${id}.png`}
        title={`Télécharge la CoronaMaison à colorier de ${username}`}
      >
        <img
          src={`/coloringPages/twitter-${id}.png`}
          alt={`Version noir et blanc à colorier de la CoronaMaison de ${username}`}
        />
      </a>

      <h2 className="text-3xl font-cursive text-center my-6">
        Tweet d'origine
      </h2>

      <TweetEmbed id={id} />

      <HandDrawnLine
        className="text-yellow-700 h-2 opacity-50 mx-auto mt-8"
        style={{ maxWidth: "80%" }}
      />

      <Share url={url} title={title} description={description} />
    </>
  );
}

Drawing.propTypes = {
  formattedDate: PropTypes.string,
  id: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  likes: PropTypes.number,
  source: PropTypes.string,
  svg: PropTypes.string,
  username: PropTypes.string,
};

export async function getStaticProps({ params: { id } }) {
  const fs = require("fs");
  const { [id]: drawing } = require("data/drawingsById.json");
  const svg = fs.readFileSync(
    `public/thumbnails/${drawing.source}-${drawing.id}.svg`,
    "utf8",
  );

  const date = DateTime.fromISO(drawing.date, {
    locale: "fr",
  });

  return {
    props: {
      ...drawing,
      svg,
      formattedDate: `${date.toLocaleString(
        DateTime.DATE_HUGE,
      )} à ${date.toLocaleString(DateTime.TIME_SIMPLE)}`,
    },
  };
}

export async function getStaticPaths() {
  const drawings = require("data/drawingsById.json");

  return {
    paths: Object.entries(drawings).map(([id]) => {
      return {
        params: { id },
      };
    }),
    fallback: false,
  };
}
