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
      <source
        media="(max-width: 800px)"
        data-srcset={`/drawings/${filename}-800.webp`}
        type="image/webp"
      />
      <source
        media="(max-width: 1200px)"
        data-srcset={`/drawings/${filename}-1026.webp`}
        type="image/webp"
      />
      <source
        media="(max-width: 800px)"
        data-srcset={`/drawings/${filename}-800.jpg`}
        type="image/jpeg"
      />
      <source
        media="(max-width: 1200px)"
        data-srcset={`/drawings/${filename}-1026.jpg`}
        type="image/jpeg"
      />
      <img
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
