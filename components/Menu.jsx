import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import MenuItem from "components/MenuItem";

export default function Menu({ allDates }) {
  return (
    <nav className="col-span-2 hidden sm:block">
      <h2 className="text-underline text-3xl font-cursive">Menu :</h2>
      <Link href="/">
        <a className="block text-xl text-blue-800 font-cursive">
          Les plus partagées
        </a>
      </Link>
      <h2 className="text-underline text-3xl font-cursive">Jours :</h2>
      {allDates.map((date) => (
        <MenuItem date={date} key={JSON.stringify(date)} />
      ))}
    </nav>
  );
}

Menu.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
};
