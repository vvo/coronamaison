import React from "react";
import PropTypes from "prop-types";

import HandDrawnLine from "svg/HandDrawnLine.svg";
import Coloring from "svg/Coloring.svg";
import Heart from "svg/Heart.svg";
import LazyDrawing from "components/LazyDrawing";

export default function DrawingItem({
  id,
  source,
  username,
  imageWidth,
  imageHeight,
  likes,
  svg,
}) {
  const profileUrl = `https://twitter.com/${username}`;
  const tweetUrl = `https://twitter.com/${username}/status/${id}`;
  const coloringPageUrl = `/coloringPages/${source}-${id}.png`;
  const avatarImage = `https://twitter-avatar.now.sh/${username}`;

  return (
    <>
      <div className="relative block mt-8 mb-12 pt-12 relative">
        <div className="flex flex-row justify-between">
          <a
            href={profileUrl}
            title={`Voir le profile twitter de ${username}`}
            className="flex items-center text-lg text-blue-800 hover:text-twitter"
          >
            <img
              className="inline-block h-12 w-12 rounded-t-lg mr-2"
              data-src={avatarImage}
              height={200}
              width={200}
              alt={`Twitter avatar for ${username}`}
            />
            <noscript>
              <img
                className="inline-block h-12 w-12 rounded-t-lg mr-2"
                src={avatarImage}
                height={200}
                width={200}
                alt={`Twitter avatar for ${username}`}
              />
            </noscript>{" "}
            @{username}
          </a>
          <a
            title={`Accéder à la version à colorier de la #CoronaMaison de ${username}`}
            href={coloringPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-lg text-blue-800 hover:text-twitter"
          >
            Colorier <Coloring className="ml-2 w-12 h-12" />
          </a>
        </div>
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
          title={`RT ou like la #CoronaMaison de ${username}`}
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-0 flex items-center text-md text-blue-800 hover:text-twitter"
          style={{ bottom: "-2.5em" }}
        >
          <Heart className="w-10 h-10" /> {likes}
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
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  likes: PropTypes.number,
  source: PropTypes.string,
  svg: PropTypes.string,
  username: PropTypes.string,
};
