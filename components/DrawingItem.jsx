import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";
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
  withColoringPage = true,
  linkToImage = false,
}) {
  const profileUrl = `https://twitter.com/${username}`;
  const tweetUrl = `https://twitter.com/${username}/status/${id}`;
  const coloringPageUrl = `/coloringPages/${source}-${id}.png`;
  const avatarImage = `https://twitter-avatar.now.sh/${username}`;

  const Drawing = () => {
    return (
      <LazyDrawing
        filename={`${source}-${id}`}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        svg={svg}
        alt={`CoronaMaison en dessin de ${username} sur Twitter`}
      />
    );
  };

  return (
    <>
      <div className="relative">
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
          {withColoringPage && (
            <a
              title={`Accéder à la version à colorier de la CoronaMaison de ${username}`}
              href={coloringPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-800 hover:text-twitter"
            >
              <span className="text-sm text-center w-24">
                Colorier la CoronaMaison
              </span>{" "}
              <Coloring className="ml-2 w-12 h-12" />
            </a>
          )}
        </div>
        {(linkToImage && (
          <a
            href={`/drawings/${source}-${id}-1026.jpg`}
            title={`Télécharger la CoronaMaison de ${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Drawing />
          </a>
        )) || (
          <Link href="/drawing/[id]" as={`/drawing/${id}`}>
            <a title={`Voir la page du dessin CoronaMaison de ${username}`}>
              <Drawing />
            </a>
          </Link>
        )}
        <a
          title={`RT ou like la CoronaMaison de ${username}`}
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-0 flex items-center text-md text-blue-800 hover:text-twitter"
          style={{ bottom: "-2.5em" }}
        >
          <Heart className="w-10 h-10" /> {likes}
        </a>
      </div>

      {process.env.APP_ENV === "development" && (
        <button
          className="mt-10 bg-red-500 text-3xl"
          onClick={async () => {
            await fetch(`/api/drawing/${id}`);
          }}
        >
          delete
        </button>
      )}
    </>
  );
}

DrawingItem.propTypes = {
  id: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  likes: PropTypes.number,
  linkToImage: PropTypes.bool,
  source: PropTypes.string,
  svg: PropTypes.string,
  username: PropTypes.string,
  withColoringPage: PropTypes.bool,
};
