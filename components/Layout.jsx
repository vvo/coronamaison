import React from "react";
import Menu from "components/Menu";
import PropTypes from "prop-types";

const allDates = require("data/allDates.json");
const { nbDrawings, lastUpdate } = require("data/state.json");

export default function Layout({ children }) {
  return (
    <div className="container mx-auto mt-12 xl:mt-6">
      <div className="xl:grid xl:grid-cols-12 xl:gap-2">
        <div className="xl:col-span-10 xl:col-start-3">
          <h1 className="font-cursive text-4xl xl:text-6xl text-center text-blue-800">
            <a href="/">#coronamaison ({nbDrawings})</a>
          </h1>
        </div>

        <Menu allDates={allDates} />

        <main className="xl:col-span-10 xl:px-5">{children}</main>

        <footer className="mt-6 xl:col-start-3 xl:col-span-10">
          <p className="text-right italic text-sm">
            Dernière mise à jour: {lastUpdate}
          </p>
        </footer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
