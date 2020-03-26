import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import { useRouter } from "next/router";

const regularClasses =
  "block text-xl text-blue-800 font-cursive hover:text-twitter";
const activeClasses = `${regularClasses} text-twitter underline`;

export default function MenuItem({
  toggleSidebar,
  href,
  as,
  noLink = false,
  children,
}) {
  const router = useRouter();

  return (
    <Link href={href} as={as}>
      <a
        onClick={toggleSidebar}
        className={router.asPath === as ? activeClasses : regularClasses}
      >
        {children}
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
  toggleSidebar: PropTypes.func,
};
