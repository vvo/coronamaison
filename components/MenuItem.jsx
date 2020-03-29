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
  children,
  prefetch,
}) {
  if (as === undefined) {
    as = href;
  }

  const router = useRouter();
  // we can't just use prefetch={prefetch} because nextjs sends a warning:
  // https://err.sh/zeit/next.js/prefetch-true-deprecated
  const prefetchAttr = prefetch === false ? { prefetch: false } : {};

  return (
    <Link href={href} as={as} {...prefetchAttr}>
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
  prefetch: PropTypes.bool,
};
