import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ProgressiveImage from "react-progressive-graceful-image";
import Line from "svg/line.svg";
import supportsWebP from "supports-webp";

export default function DrawingItem({
  id,
  source,
  username,
  avatarImage,
  imageHeight,
  imageWidth,
}) {
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
        className="block mt-8 mb-12 pt-12 text-lg text-blue-800 hover:text-twitter relative"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="fixed-ratio"
          style={{
            paddingBottom: `${((imageHeight / imageWidth) * 100).toFixed(2)}%`,
          }}
        >
          <ProgressiveImage
            delay={300}
            className="fixed-ratio"
            style={{
              paddingBottom: `${((imageHeight / imageWidth) * 100).toFixed(
                2,
              )}%`,
            }}
            placeholder=""
            src={canUseWebp ? drawingWebpSrc : drawingJpgSrc}
          >
            {(src, loading) => {
              if (loading) {
                return (
                  <img
                    src={drawingThumbnailSrc}
                    className="fixed-ratio-content"
                    height={imageHeight}
                    width={imageWidth}
                  />
                );
              }

              if (src) {
                return (
                  <img
                    src={src}
                    alt="an image"
                    className="fixed-ratio-content"
                    height={imageHeight}
                    width={imageWidth}
                  />
                );
              }

              return (
                <noscript>
                  <img
                    src={drawingJpgSrc}
                    className="fixed-ratio-content"
                    height={imageHeight}
                    width={imageWidth}
                  />
                </noscript>
              );
            }}
          </ProgressiveImage>
        </div>
        <div className="absolute top-0">
          <img
            className="inline-block h-12 w-12 rounded-t-lg mr-2"
            src={avatarImage}
            alt={`Twitter avatar for ${username}`}
          />{" "}
          @{username}
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
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};
