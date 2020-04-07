import React from "react";
import PropTypes from "prop-types";
import HandDrawnLine from "svg/HandDrawnLine.svg";

import DrawingItem from "components/DrawingItem";

export default function DrawingsList({ drawings }) {
  return drawings.map((drawing) => (
    <>
      <DrawingItem {...drawing} key={`${drawing.source}-${drawing.id}`} />
      <HandDrawnLine
        className="text-yellow-700 h-2 opacity-50 mx-auto"
        style={{ maxWidth: "80%" }}
      />
    </>
  ));
}

DrawingsList.propTypes = {
  drawings: PropTypes.arrayOf(PropTypes.object),
};
