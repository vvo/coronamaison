import React from "react";
import Link from "next/link";

import Head from "next/head";

export default function JeVeuxDessiner() {
  const title =
    "CoronaMaison : draw your own coronamaison with this starter drawing";
  const description =
    "Participate in the CoronaMaison project on social networks using the starter drawing to create your own CoronaMaison !";
  const socialImage = "https://coronamaison.net/modele-coronamaison.jpg";

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
        I want to draw : the starter drawing of CoronaMaison
      </h2>

      <p className="text-lg mt-6">
        To participate in the CoronaMaison project and publish your drawing via
        the hashtag{" "}
        <a
          href="https://twitter.com/hashtag/coronamaison"
          className="text-blue-800 underline hover:text-twitter"
        >
          #CoronaMaison
        </a>
        , here is how easy it is:
      </p>

      <ol className="mt-4">
        <li className="text-lg">
          1.{" "}
          <a
            href="/modele-coronamaison.jpg"
            alt="Modèle de dessin Coronamaison"
            className="text-blue-800 underline hover:text-twitter"
          >
            ⬇️ Download
          </a>{" "}
          the starter drawing. You can either draw inspiration from it or print
          it and draw directly on it.
        </li>
        <li className="text-lg">
          2. Uses pencils, mouse, keyboard or tablet graphic and have fun!
        </li>
        <li className="text-lg">
          3. Publish your drawing on{" "}
          <a
            href="https://twitter.com"
            className="text-blue-800 underline hover:text-twitter"
          >
            Twitter
          </a>{" "}
          by adding the hashtag #CoronaMaison to the text accompanying your
          image (
          <a
            href="https://twitter.com/Bouletcorp/status/1241018332112998401"
            className="text-blue-800 underline hover:text-twitter"
            alt="Exemple d'un tweet CoronaMaison de Boulet"
          >
            example
          </a>
          )
        </li>
        <li className="text-lg">
          4. Your drawing will be published the next day (or later), on this
          site
        </li>
      </ol>

      <h3 className="mt-6 mb-4 text-2xl font-cursive">
        The starter drawing of coronamaison
      </h3>

      <p className="mt-6 text-lg">
        Reminder : this drawing was produced by{" "}
        <a
          href="https://twitter.com/acupoftim"
          className="text-blue-800 underline hover:text-twitter"
        >
          Timothy Hannem
        </a>{" "}
        but there are also other people in this project, more information on the{" "}
        <Link href="/en/about">
          <a className="text-blue-800 underline hover:text-twitter">About</a>
        </Link>{" "}
        page.
      </p>

      <a
        href="/modele-coronamaison.jpg"
        alt="Modèle de dessin Coronamaison"
        className="text-blue-800 underline hover:text-twitter"
      >
        <img src="/modele-coronamaison.jpg" className="mt-6" />
      </a>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      lang: "en",
    },
  };
}
