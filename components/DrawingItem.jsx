import React from "react";
import PropTypes from "prop-types";

import ProgressiveImage from "react-progressive-graceful-image";
import TwitterIcon from "svg/twitter.svg";
import Line from "svg/line.svg";

export default function DrawingItem({ id, source, username, image }) {
  const drawingThumbnailSrc = `/thumbnails/${source}-${id}.svg`;
  const url = `https://twitter.com/${username}/status/${id}`;

  return (
    <>
      <a
        className="block mt-6 text-lg text-blue-800 hover:text-twitter"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProgressiveImage delay={300} placeholder="" src={image}>
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
                <img src={image} />
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

      <Line className="text-yellow-700 h-2 opacity-50 my-6 mx-auto" />
    </>
  );
}

DrawingItem.propTypes = {
  id: PropTypes.string,
  source: PropTypes.string,
  username: PropTypes.string,
  image: PropTypes.string,
};
