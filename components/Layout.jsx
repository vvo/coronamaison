import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Menu from "components/Menu";
import Search from "components/Search";

const allDates = require("data/allDates.json");
const { nbDrawings, lastUpdate } = require("data/state.json");

export default function Layout({ children, lang }) {
  return (
    <div className="container mx-auto mt-12 xl:mt-6">
      <div className="xl:grid xl:grid-cols-12 xl:gap-2">
        <div className="xl:col-span-10 xl:col-start-3">
          <h1 className="font-cursive text-4xl xl:text-6xl text-center text-blue-800">
            <Link href={lang === "en" ? "/en" : "/"}>
              <a
                title="Tous les dessins CoronaMaison du hashtag #CoronaMaison"
                className="text-blue-800 hover:text-twitter"
              >
                CoronaMaison ({nbDrawings})
              </a>
            </Link>
          </h1>
        </div>

        <Menu allDates={allDates} lang={lang} />

        <main className="xl:col-span-10 xl:px-5 px-2">
          <Search lang={lang}>{children}</Search>
        </main>

        <footer className="py-6 xl:col-start-3 xl:col-span-10">
          <p className="text-right italic text-sm">
            {lang === "en"
              ? `Last update: ${lastUpdate}. `
              : `Dernière mise à jour : ${lastUpdate}.`}
          </p>

          <p className="text-right italic text-sm">
            {lang === "en"
              ? `The designs remain the property of their respective authors.`
              : `Les dessins restent la propriété de leurs auteurs respectifs.`}
          </p>
        </footer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string,
};
