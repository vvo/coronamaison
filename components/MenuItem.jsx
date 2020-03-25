import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

export default function MenuItem({ date: { day, month, year, nbDrawings } }) {
  return (
    <Link href="/[year]/[month]/[day]" as={`/${year}/${month}/${day}`}>
      <a className="block text-xl text-blue-800 font-cursive">
        {day}/{month}/{year} <sup>(+{nbDrawings})</sup>
      </a>
    </Link>
  );
}

MenuItem.propTypes = {
  date: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    nbDrawings: PropTypes.number,
  }),
};
