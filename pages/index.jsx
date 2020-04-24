import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";

import DrawingsList from "components/DrawingsList";
import Share from "components/Share";

export default function Home({ top50Drawings }) {
  const title = "CoronaMaison : Tous les dessins du challenge artistique";
  const description =
    "Ce site contient tous les dessins du hashtag #CoronaMaison publiés sur les réseaux sociaux. Ils sont organisés par date et popularité. Découvre-les !";
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

      <Share url={url} title={title} description={description} />

      <DrawingsList drawings={top50Drawings} />

      <p className="text-lg mt-6">
        Le challenge CoronaMaison consiste à dessiner votre lieu de confinement
        favori durant la pandémie de COVID-19 en utilisant un{" "}
        <a
          href="/modele-coronamaison.jpg"
          className="text-blue-800 underline hover:text-twitter"
        >
          modèle de dessin
        </a>
        . Puis à le publier sur les réseaux sociaux en utilisant le hashtag{" "}
        <a
          href="https://twitter.com/hashtag/coronamaison"
          className="text-blue-800 underline hover:text-twitter"
        >
          #CoronaMaison
        </a>
        . Ce site recense tous les dessins publiés par date. Retrouvez le modèle
        et plus d'informations dans les pages{" "}
        <Link href="/a-propos">
          <a className="text-blue-800 underline hover:text-twitter">À propos</a>
        </Link>{" "}
        et{" "}
        <Link href="/je-veux-dessiner">
          <a className="text-blue-800 underline hover:text-twitter">
            Je veux dessiner
          </a>
        </Link>
        .
      </p>

      <p className="text-lg mt-6">
        Le projet{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/hashtag/coronamaison"
        >
          CoronaMaison
        </a>{" "}
        c'est l'idée de :{" "}
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
        . Merci à eux !
      </p>

      <Share url={url} title={title} description={description} />
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
    },
  };
}
