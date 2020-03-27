import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import { useRouter } from "next/router";

const regularClasses =
  "block text-xl text-blue-800 font-cursive hover:text-twitter";
const activeClasses = `${regularClasses} text-twitter underline`;

export default function MenuItem({ toggleSidebar, href, as, children }) {
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
  as: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  toggleSidebar: PropTypes.func,
};
