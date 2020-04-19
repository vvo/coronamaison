import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";

import DrawingsList from "components/DrawingsList";
import Share from "components/Share";

export default function Home({ top50Drawings }) {
  // const title = "CoronaMaison : Tous les dessins du challenge artistique";
  const title = "CoronaMaison : All the drawings of the artistic challenge";
  // const description = "Ce site contient tous les dessins du hashtag #CoronaMaison publiés sur les réseaux sociaux. Ils sont organisés par date et popularité. Découvre-les !";
  const description =
    "This site contains all the drawings of the hashtag #CoronaMaison published on social networks. They are organized by date and popularity. Discover them!";
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
        Top 50 most shared #CoronaMaisons
      </h2>

      <Share url={url} title={title} description={description} lang={"en"} />

      <DrawingsList drawings={top50Drawings} lang={"en"} />

      <p className="text-lg mt-6">
        The CoronaMaison challenge consists in drawing your favorite place of
        containment during the COVID-19 pandemic using a{" "}
        <a
          href="/modele-coronamaison.jpg"
          className="text-blue-800 underline hover:text-twitter"
        >
          starter drawing
        </a>
        . Then publish it on social media using the hashtag{" "}
        <a
          href="https://twitter.com/hashtag/coronamaison"
          className="text-blue-800 underline hover:text-twitter"
        >
          #CoronaMaison
        </a>
        . This site lists all the drawings published by date. Find the starter drawing and more information in the pages{" "}
        <Link href="/en/about">
          <a className="text-blue-800 underline hover:text-twitter">About</a>
        </Link>{" "}
        and{" "}
        <Link href="/en/i-want-to-draw">
          <a className="text-blue-800 underline hover:text-twitter">
            I want to draw
          </a>
        </Link>
        .
      </p>

      <p className="text-lg mt-6">
        The project{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/hashtag/coronamaison"
        >
          CoronaMaison
        </a>{" "}
        is an original idea of:{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/PenelopeB"
        >
          Pénélope Bagieu
        </a>
        ,{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/OssKx"
        >
          Oscar Barda
        </a>
        ,{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/garagedeloffre"
        >
          Sandrine Deloffre
        </a>{" "}
        et{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/acupoftim"
        >
          Timothy Hannem
        </a>
        . Thanks a lot to them !
      </p>

      <Share url={url} title={title} description={description} lang={"en"} />
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
    delete drawing.date;
    drawing.svg = svg;
    return drawing;
  });

  return {
    props: {
      top50Drawings,
      lang: "en",
    },
  };
}
