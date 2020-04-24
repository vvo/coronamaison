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
  const drawingUrl = `${process.env.DRAWINGS_BASE_URL}/drawings/${filename}-1026.jpg`;

  return (
    <picture
      className="fixed-ratio bg-cover"
      style={{
        paddingBottom: `${ratio}%`,
        background: `url(data:image/svg+xml;utf8,${encodeURIComponent(svg)})`,
      }}
    >
      <source
        data-sizes="(max-width: 1026px) 100vw, 1026px"
        data-srcset={`
        ${drawingUrl}?fmt=webp&w=800 800w,
        ${drawingUrl}?fmt=webp&w=1026 1026w
        `}
        type="image/webp"
        className="fixed-ratio-content lazy"
      />
      <img
        data-sizes="(max-width: 1026px) 100vw, 1026px"
        data-srcset={`
        ${drawingUrl}?&w=800 800w,
        ${drawingUrl}?&w=1026 1026w
        `}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="fixed-ratio-content lazy"
      />
      <noscript>
        <source
          sizes="(max-width: 1026px) 100vw, 1026px"
          srcSet={`
          ${drawingUrl}?fmt=webp&w=800 800w,
          ${drawingUrl}?fmt=webp&w=1026 1026w
        `}
          type="image/webp"
          className="fixed-ratio-content"
        />
        <img
          sizes="(max-width: 1026px) 100vw, 1026px"
          srcSet={`
          ${drawingUrl}?&w=800 800w,
          ${drawingUrl}?&w=1026 1026w
        `}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="fixed-ratio-content"
          src={`${drawingUrl}?&w=1026 1026w`}
        />
      </noscript>
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
