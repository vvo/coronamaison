import React from "react";

import Head from "next/head";

export default function JeVeuxDessiner() {
  const title = "Coronamaison : dessine ta coronamaison avec le modèle";
  const description =
    "Participe à la Coronamaison sur les réseaux sociaux en utilisant le modèle de dessin pour créer ta propre coronamaison !";
  const socialImage = "https://coronamaison.now.sh/modele.jpg";

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
        Je veux dessiner : le modèle de coronamaison
      </h2>

      <p className="text-lg mt-6">
        Pour participer à la Coronamaison et publier ton propre dessin via le
        hashtag{" "}
        <a href="https://twitter.com/hashtag/coronamaison?lang=en">
          #coronamaison
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
          3. Publie ton dessin sur <a href="https://twitter.com">Twitter</a> en
          ajoutant le hashtag #coronamaison au texte qui accompagne ton image (
          <a
            href="https://twitter.com/Bouletcorp/status/1241018332112998401"
            alt="Exemple d'un tweet #coronamaison"
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

      <a href="/modele-coronamaison.jpg" alt="Modèle de dessin Coronamaison">
        <img src="/modele-coronamaison.jpg" />
      </a>
    </>
  );
}
