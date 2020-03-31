import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CloseOverlayIcon from "svg/CloseOverlay.svg";

import MenuIcon from "svg/Menu.svg";
import Line from "svg/Line.svg";

import MenuItem from "components/MenuItem";

export default function Menu({ allDates }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.classList.remove("overflow-hidden");
    } else {
      document.body.classList.add("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <>
      {(isSidebarOpen && (
        <div className="xl:hidden fixed inset-0 z-10">
          <div
            onClick={toggleSidebar}
            className="absolute inset-0 bg-gray-600 opacity-75"
          />
          <div className="absolute h-full inset-y-0 inset-left-0 w-30 rice border-right border-r-2 border-yellow-900 overflow-y-auto">
            <Nav allDates={allDates} toggleSidebar={toggleSidebar} />
          </div>
          <div className="absolute top-0 p-1" style={{ left: "11.5rem" }}>
            <button
              onClick={toggleSidebar}
              className="h-10 w-10 bg-yellow-900 flex items-center justify-center rounded-full text-white"
            >
              <CloseOverlayIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      )) || (
        <div className="fixed top-0 left-0 xl:hidden z-10">
          <button
            onClick={toggleSidebar}
            className="h-12 w-12 inline-flex items-center justify-center rounded-br-lg text-yellow-900 bg-white"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="hidden xl:col-span-2 xl:block">
        <Nav allDates={allDates} />
      </div>
    </>
  );
}

function Nav({ allDates, toggleSidebar }) {
  return (
    <nav className="px-3">
      <div className="text-3xl font-cursive">Menu :</div>
      <MenuItem href="/" toggleSidebar={toggleSidebar}>
        Les plus partagées
      </MenuItem>

      <MenuItem href="/je-veux-dessiner" toggleSidebar={toggleSidebar}>
        Je veux dessiner !
      </MenuItem>

      <Line className="text-yellow-700 my-4 h-2 w-32 opacity-50 mx-auto" />

      {allDates.map((date, dateIndex) => {
        const { day, month, year, nbDrawings } = date;
        const as = `/${year}/${month}/${day}`;
        return (
          <MenuItem
            href="/[year]/[month]/[day]"
            as={as}
            key={as}
            toggleSidebar={toggleSidebar}
            prefetch={dateIndex < 2 ? true : false} // prefetch only first two items, see https://nextjs.org/docs/api-reference/next/link
          >
            {day}/{month}/{year} <sup>(+{nbDrawings})</sup>
          </MenuItem>
        );
      })}

      <Line className="text-yellow-700 my-4 h-2 w-32 opacity-50 mx-auto" />

      <a
        href="https://simpleanalytics.com/coronamaison.net"
        className="block text-xl text-blue-800 font-cursive hover:text-twitter"
      >
        Statistiques
      </a>
    </nav>
  );
}

Nav.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
  toggleSidebar: PropTypes.func,
};

Menu.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
};
