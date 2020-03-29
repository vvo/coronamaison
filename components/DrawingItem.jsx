import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Line from "svg/line.svg";
import supportsWebP from "supports-webp";
import LazyDrawing from "components/LazyDrawing";

export default function DrawingItem({
  id,
  source,
  username,
  avatarImage,
  imageWidth,
  imageHeight,
  svg,
}) {
  const url = `https://twitter.com/${username}/status/${id}`;

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
      <a
        className="block mt-8 mb-12 pt-12 text-lg text-blue-800 hover:text-twitter relative"
        href={url}
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
        <div className="absolute top-0">
          <img
            className="inline-block h-12 w-12 rounded-t-lg mr-2"
            src={avatarImage}
            alt={`Twitter avatar for ${username}`}
          />{" "}
          @{username}
        </div>
      </a>

      <button
        className="text-3xl"
        onClick={async () => {
          await fetch(`/api/drawing/${id}`);
        }}
      >
        delete
      </button>

      <Line
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
