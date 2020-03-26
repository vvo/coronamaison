import React from "react";
import Menu from "components/Menu";
import PropTypes from "prop-types";

const allDates = require("data/allDates.json");
const { nbDrawings, lastUpdate } = require("data/state.json");

export default function Layout({ children }) {
  return (
    <div className="container mx-auto mt-5">
      <div className="lg:grid lg:grid-cols-12 lg:gap-2">
        <div className="lg:col-span-10 lg:col-start-3">
          <h1 className="font-cursive text-4xl lg:text-6xl text-center text-blue-800">
            <a href="/">#coronamaison ({nbDrawings})</a>
          </h1>
          <p className="text-center italic">
            Dernière mise à jour: {lastUpdate}
          </p>
        </div>

        <Menu allDates={allDates} />

        <main className="lg:col-span-10 lg:px-5">{children}</main>

        <footer className="lg:col-start-3 lg:col-span-10"></footer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
