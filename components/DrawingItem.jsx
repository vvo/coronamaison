import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ProgressiveImage from "react-progressive-graceful-image";
import TwitterIcon from "svg/twitter.svg";
import Line from "svg/line.svg";
import supportsWebP from "supports-webp";

export default function DrawingItem({ id, source, username }) {
  const drawingThumbnailSrc = `/thumbnails/${source}-${id}.svg`;
  const drawingJpgSrc = `/drawings/${source}-${id}.jpg`;
  const drawingWebpSrc = `/drawings/${source}-${id}.webp`;
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
        className="block mt-6 text-lg text-blue-800 hover:text-twitter"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProgressiveImage
          delay={300}
          placeholder=""
          src={canUseWebp ? drawingWebpSrc : drawingJpgSrc}
        >
          {(src, loading) => {
            if (loading) {
              // return <img style={{ height: "10rem" }} src={image} />;
              return <img src={drawingThumbnailSrc} />;
            }

            if (src) {
              return (
                // <img style={{ height: "10rem" }} src={src} alt="an image" />
                <img src={src} alt="an image" />
              );
            }

            return (
              <noscript>
                <img src={drawingJpgSrc} />
              </noscript>
            );
          }}
        </ProgressiveImage>
        <div className="mt-5">
          <TwitterIcon className="h-10 inline-block" /> @{username}
        </div>
      </a>

      {/* <button
        className="text-3xl"
        onClick={async () => {
          await fetch(`/api/drawing/${id}`);
        }}
      >
        delete
      </button> */}

      <Line
        className="text-yellow-700 h-2 opacity-50 my-6 mx-auto"
        style={{ maxWidth: "80%" }}
      />
    </>
  );
}

DrawingItem.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  username: PropTypes.string,
  image: PropTypes.string,
};
