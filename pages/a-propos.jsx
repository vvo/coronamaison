import React from "react";
import Head from "next/head";
import Link from "next/link";
import TweetEmbed from "react-tweet-embed";

export default function About() {
  const title = "CoronaMaison : à propos du projet CoronaMaison";
  const description = "Qui est derrière le project CoronaMaison";
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
      <h2 className="text-3xl font-cursive text-center">À-propos</h2>
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
          href="https://twitter.com/PenelopeB"
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
        . Et ça a commencé le 15 Mars 2020 avec un tweet comme ça :
      </p>
      <TweetEmbed id="1239186251833630720" />
      <p className="text-lg mt-6">
        Le{" "}
        <Link href="/je-veux-dessiner">
          <a className="text-blue-800 underline hover:text-twitter">
            modèle de CoronaMaison
          </a>
        </Link>{" "}
        est un dessin de{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/acupoftim"
        >
          Timothy Hannem
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        Ce site internet a été réalisé par Vincent Voyer car je souhaitai être
        sûr de ne rater aucune CoronaMaison (d'où l'organisation sous forme de
        dates) et puis ensuite je me suis un peu emballé. Le code source est en
        libre accès ici (venez m'aider c'est fun) :{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://github.com/vvo/coronamaison"
        >
          https://github.com/vvo/coronamaison
        </a>
        .
      </p>

      <p>
        Les versions à colorier sont générées automatiquement par les programmes
        de Peter Selinger :{" "}
        <a href="http://potrace.sourceforge.net/mkbitmap.html">mkbitmap</a> et{" "}
        <a href="http://potrace.sourceforge.net/">potrace</a>. Merci pour vos
        conseils avisés sur la meilleure façon d'utiliser ces programmes.
      </p>

      <p className="text-lg mt-6">
        Tous les dessins restent la propriété de leurs auteurs respectifs. Si
        vous souhaitez : changer l'attribution d'un dessin, changer l'image d'un
        dessin ou de sa version à colorier, enlever un dessin, savoir pourquoi
        votre dessin n'est pas là, ou toute autre demande, contactez l'auteur du
        site via{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="mailto:vincent.voyer+coronamaison@gmail.com"
        >
          vincent.voyer@gmail.com
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        Le site officiel de CoronaMaison c'est{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://coronamaison.fun/"
        >
          https://coronamaison.fun/
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        Remerciements :{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://www.freepik.com/free-photos-vectors/background"
        >
          Background vector created by freepik - www.freepik.com
        </a>{" "}
        | Heart icon made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        .
      </p>
    </>
  );
}
