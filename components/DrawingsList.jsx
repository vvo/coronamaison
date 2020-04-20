import React from "react";
import PropTypes from "prop-types";
import HandDrawnLine from "svg/HandDrawnLine.svg";

import DrawingItem from "components/DrawingItem";

export default function DrawingsList({ drawings, lang }) {
  return drawings.map((drawing) => (
    <div key={`${drawing.source}-${drawing.id}`} className="mt-8 mb-12 pt-12">
      <DrawingItem {...drawing} lang={"en"} />
      <HandDrawnLine
        className="text-yellow-700 h-2 opacity-50 mx-auto"
        style={{ maxWidth: "80%" }}
      />
    </div>
  ));
}

DrawingsList.propTypes = {
  drawings: PropTypes.arrayOf(PropTypes.object),
  lang: PropTypes.string,
};
