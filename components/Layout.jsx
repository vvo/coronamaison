import React from "react";
import Menu from "components/Menu";
import PropTypes from "prop-types";

const allDates = require("data/allDates.json");
const { nbDrawings, lastUpdate } = require("data/state.json");

export default function Layout({ children }) {
  return (
    <div className="container mx-auto px-5 mt-5">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 sm:col-span-10 sm:col-start-3">
          <h1 className="font-cursive text-4xl sm:text-6xl text-center text-blue-800">
            <a href="/">#coronamaison ({nbDrawings})</a>
          </h1>
          <p className="text-center italic">
            Dernière mise à jour: {lastUpdate}
          </p>
        </div>

        <Menu allDates={allDates} />

        <main className="col-span-12 sm:col-span-10">{children}</main>

        <footer className="sm:col-start-3 col-span-12 sm:col-span-10"></footer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
