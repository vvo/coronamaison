import React from "react";
import Link from "next/link";

import Head from "next/head";

export default function JeVeuxDessiner() {
  const title = "CoronaMaison : dessine ta coronamaison avec le modèle";
  const description =
    "Participe au projet CoronaMaison sur les réseaux sociaux en utilisant le modèle de dessin pour créer ta propre CoronaMaison !";
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
        Je veux dessiner : le modèle de CoronaMaison
      </h2>

      <p className="text-lg mt-6">
        Pour participer au projet CoronaMaison et publier ton dessin via le
        hashtag{" "}
        <a
          href="https://twitter.com/hashtag/coronamaison"
          className="text-blue-800 underline hover:text-twitter"
        >
          #CoronaMaison
        </a>
        , rien de plus simple:
      </p>

      <ol className="mt-4">
        <li className="text-lg">
          1.{" "}
          <a
            href="/modele-coronamaison.jpg"
            alt="Modèle de dessin Coronamaison"
            className="text-blue-800 underline hover:text-twitter"
          >
            ⬇️ Télécharge
          </a>{" "}
          le modèle de dessin. Tu peux soit t'en inspirer, soit l'imprimer et
          dessiner directement dessus.
        </li>
        <li className="text-lg">
          2. Utilise des crayons, une souris, un clavier ou une tablette
          graphique et fais toi plaisir !
        </li>
        <li className="text-lg">
          3. Publie ton dessin sur{" "}
          <a
            href="https://twitter.com"
            className="text-blue-800 underline hover:text-twitter"
          >
            Twitter
          </a>{" "}
          en ajoutant le hashtag #CoronaMaison au texte qui accompagne ton image
          (
          <a
            href="https://twitter.com/Bouletcorp/status/1241018332112998401"
            className="text-blue-800 underline hover:text-twitter"
            alt="Exemple d'un tweet CoronaMaison de Boulet"
          >
            exemple
          </a>
          )
        </li>
        <li className="text-lg">
          4. Ton dessin sera publié le lendemain (ou plus tard), sur ce site
        </li>
      </ol>

      <h3 className="mt-6 mb-4 text-2xl font-cursive">
        Le modèle de coronamaison
      </h3>

      <p className="mt-6 text-lg">
        Rappel : ce modèle a été réalisé par{" "}
        <a
          href="https://twitter.com/acupoftim"
          className="text-blue-800 underline hover:text-twitter"
        >
          Timothy Hannem
        </a>{" "}
        mais y'a aussi d'autres gens dans ce projet, plus d'informations sur la
        page{" "}
        <Link href="/a-propos">
          <a className="text-blue-800 underline hover:text-twitter">À-propos</a>
        </Link>
        .
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
