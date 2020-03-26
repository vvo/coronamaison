import React from "react";
import Menu from "components/Menu";
import PropTypes from "prop-types";

const allDates = require("data/allDates.json");
const { nbDrawings, lastUpdate } = require("data/state.json");

export default function Layout({ children }) {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="font-cursive text-4xl lg:text-6xl text-center text-blue-800">
        <a href="/">#coronamaison ({nbDrawings})</a>
      </h1>
      <p className="text-center italic">Dernière mise à jour: {lastUpdate}</p>

      <Menu allDates={allDates} />

      <main className="w-5/6 mx-auto">{children}</main>

      <footer></footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
