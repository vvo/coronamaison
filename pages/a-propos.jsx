import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function About() {
  const title = "Coronamaison : à propos du projet #coronamaison";
  const description = "";
  const socialImage = "https://coronamaison.net/modele.jpg";

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
          #CoronaMaison
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
      <blockquote className="twitter-tweet">
        <p lang="fr" dir="ltr">
          Ok voici le template que{" "}
          <a href="https://twitter.com/acupoftim?ref_src=twsrc%5Etfw">
            @acupoftim
          </a>{" "}
          nous a fait pour la{" "}
          <a href="https://twitter.com/hashtag/Coronamaison?src=hash&amp;ref_src=twsrc%5Etfw">
            #Coronamaison
          </a>{" "}
          ! On dessine l‘étage/la déco/la compagnie/les animaux/la bouffe/les
          fenêtres, enfin l’endroit idéal pour être confiné(e)! Et si on fait du
          noir et blanc, que les coloristes n’hésitent pas à reprendre les
          images{" "}
          <a href="https://t.co/7BvqQOA9GU">pic.twitter.com/7BvqQOA9GU</a>
        </p>
        &mdash; Pélénope Bagieu (@PenelopeB){" "}
        <a href="https://twitter.com/PenelopeB/status/1239186251833630720?ref_src=twsrc%5Etfw">
          March 15, 2020
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
      <p className="text-lg mt-6">
        Le{" "}
        <Link href="/je-veux-dessiner">
          <a className="text-blue-800 underline hover:text-twitter">
            modèle de #CoronaMaison
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
        sûr de ne rater aucune #CoronaMaison (d'où l'organisation sous forme de
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
        Le site officiel de #CoronaMaison c'est{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://coronamaison.fun/"
        >
          https://coronamaison.fun/
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        Le fond de cette page :{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://www.freepik.com/free-photos-vectors/background"
        >
          Background vector created by freepik - www.freepik.com
        </a>
        .
      </p>
    </>
  );
}
