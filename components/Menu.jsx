import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import CloseOverlayIcon from "svg/CloseOverlay.svg";
import MenuIcon from "svg/Menu.svg";

import MenuItem from "components/MenuItem";

export default function Menu({ allDates }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {(isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-10">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          <div className="absolute h-screen inset-y-0 inset-left-0 w-30 rice border-right border-r-2 border-yellow-900">
            <Nav allDates={allDates} />
          </div>
          <div className="absolute top-0 p-1" style={{ left: "11rem" }}>
            <button
              onClick={toggleSidebar}
              className="h-8 w-8 bg-yellow-900 flex items-center justify-center rounded-full text-white"
            >
              <CloseOverlayIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )) || (
        <div className="absolute top-0 left-0 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="h-12 w-12 inline-flex items-center justify-center rounded-md text-yellow-900"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="hidden lg:col-span-2 lg:block">
        <Nav allDates={allDates} />
      </div>
    </>
  );
}

function Nav({ allDates }) {
  return (
    <nav className="px-3">
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

Nav.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
};

Menu.propTypes = {
  allDates: PropTypes.arrayOf(PropTypes.object),
};
