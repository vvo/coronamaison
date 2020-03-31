import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import HandDrawnLine from "svg/HandDrawnLine.svg";
import Coloring from "svg/Coloring.svg";
import supportsWebP from "supports-webp";
import LazyDrawing from "components/LazyDrawing";

export default function DrawingItem({
  id,
  source,
  username,
  imageWidth,
  imageHeight,
  svg,
}) {
  const profileUrl = `https://twitter.com/${username}`;
  const tweetUrl = `https://twitter.com/${username}/status/${id}`;
  const coloringPageUrl = `/coloringPages/${source}-${id}.png`;
  const avatarImage = `https://twitter-avatar.now.sh/${username}`;

  const [detectingWebp, setDetectingWebp] = useState(true);
  const [canUseWebp, setCanUseWebp] = useState(false);

  useEffect(() => {
    supportsWebP.then((supported) => {
      setCanUseWebp(supported);
      setDetectingWebp(false);
    });
  }, [detectingWebp, canUseWebp]);

  if (detectingWebp) {
    return null;
  }

  return (
    <>
      <div className="block mt-8 mb-12 pt-12 relative">
        <a
          href={tweetUrl}
          title={`Voir le tweet #CoronaMaison de ${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LazyDrawing
            filename={`${source}-${id}`}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            svg={svg}
            alt={`Coronamaison en dessin de ${username} sur Twitter`}
          />
        </a>
        <a
          href={profileUrl}
          title={`Voir le profile twitter de ${username}`}
          className="absolute top-0 text-lg text-blue-800 hover:text-twitter"
        >
          <img
            className="inline-block h-12 w-12 rounded-t-lg mr-2"
            data-src={avatarImage}
            alt={`Twitter avatar for ${username}`}
          />{" "}
          @{username}
        </a>
        <a
          title={`Accéder à la version à colorier de la #CoronaMaison de ${username}`}
          href={coloringPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block absolute top-0 right-0 flex items-center text-lg text-blue-800 hover:text-twitter"
        >
          Colorier <Coloring className="w-12 h-12" />
        </a>
      </div>

      {/* <button
        className="text-3xl"
        onClick={async () => {
          await fetch(`/api/drawing/${id}`);
        }}
      >
        delete
      </button> */}

      <HandDrawnLine
        className="text-yellow-700 h-2 opacity-50 mx-auto"
        style={{ maxWidth: "80%" }}
      />
    </>
  );
}

DrawingItem.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  username: PropTypes.string,
  avatarImage: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  svg: PropTypes.string,
};
