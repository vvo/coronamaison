import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function About() {
  const title = "CoronaMaison : about the CoronaMaison project";
  const description = "CoronaMaison : Who's behind it?";
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
      <h2 className="text-3xl font-cursive text-center">About</h2>
      <p className="text-lg mt-6">
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/hashtag/coronamaison"
        >
          The CoronaMaison
        </a>{" "}
        project is an idea of:{" "}
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
        and{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/acupoftim"
        >
          Timothy Hannem
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        The{" "}
        <Link href="/je-veux-dessiner">
          <a className="text-blue-800 underline hover:text-twitter">
            original draw CoronaMaison
          </a>
        </Link>{" "}
        was drawn by{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://twitter.com/acupoftim"
        >
          Timothy Hannem
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        This website was created by Vincent Voyer because I wanted to be sure
        not to miss any CoronaMaison (hence the chronological order) and then I
        got a little excited. The source code is accessible freely on Github
        (come help me it's fun):{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://github.com/vvo/coronamaison"
        >
          https://github.com/vvo/coronamaison
        </a>
        .
      </p>

      <p className="text-lg mt-6">
        The coloring versions are generated automatically using Peter Selinger's
        programs:{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="http://potrace.sourceforge.net/mkbitmap.html"
        >
          mkbitmap
        </a>{" "}
        and{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="http://potrace.sourceforge.net/"
        >
          potrace
        </a>
        . Thanks for your wise advice on how best to use these programs.
      </p>

      <p className="text-lg mt-6">
        All designs remain the property of their respective authors. If you want
        to: change the attribution of a drawing, the image of a drawing or its
        coloring version, remove a drawing, find out why your drawing is not
        there, or any other request, contact the author of the site via{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="mailto:vincent.voyer+coronamaison@gmail.com"
        >
          vincent.voyer@gmail.com
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        The official CoronaMaison website is{" "}
        <a
          className="text-blue-800 underline hover:text-twitter"
          href="https://coronamaison.fun/"
        >
          https://coronamaison.fun/
        </a>
        .
      </p>
      <p className="text-lg mt-6">
        Thanks:{" "}
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

export async function getStaticProps() {
  return {
    props: {
      lang: "en",
    },
  };
}
