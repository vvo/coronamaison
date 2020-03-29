import PropTypes from "prop-types";
import React, { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";

if (typeof window !== "undefined") {
  if (!document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad({
      use_native: true,
      load_delay: 500,
    });
  }
}

// Add polyfills, add noscript
export default function LazyDrawing({
  filename,
  imageWidth,
  imageHeight,
  alt,
  svg,
}) {
  useEffect(() => {
    document.lazyLoadInstance.update();
  });
  const ratio = ((imageHeight / imageWidth) * 100).toFixed(2);

  return (
    <picture
      className="fixed-ratio bg-cover"
      style={{
        paddingBottom: `${ratio}%`,
        background: `url(data:image/svg+xml;utf8,${encodeURIComponent(svg)})`,
      }}
    >
      {/* <img src={`/thumbnails/${filename}.svg`} /> */}

      <source
        data-sizes="(max-width: 1026px) 100vw, 1026px"
        data-srcset={`
  /drawings/${filename}-375.webp 375w,
  /drawings/${filename}-640.webp 640w,
  /drawings/${filename}-872.webp 872w,
  /drawings/${filename}-1026.webp 1026w`}
        type="image/webp"
      />
      <img
        data-sizes="(max-width: 1026px) 100vw, 1026px"
        data-srcset={`
  /drawings/${filename}-375.jpg 375w,
  /drawings/${filename}-640.jpg 640w,
  /drawings/${filename}-872.jpg 872w,
  /drawings/${filename}-1026.jpg 1026w`}
        data-src={`/drawings/${filename}-1026.jpg`}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="fixed-ratio-content lazy"
      />
    </picture>
  );
}

LazyDrawing.propTypes = {
  alt: PropTypes.string,
  filename: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  svg: PropTypes.any,
};
