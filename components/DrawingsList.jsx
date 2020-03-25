import React from "react";
import PropTypes from "prop-types";

import DrawingItem from "components/DrawingItem";

export default function DrawingsList({ drawings }) {
  return drawings.map((drawing) => (
    <DrawingItem {...drawing} key={`${drawing.source}-${drawing.id}`} />
  ));
}

DrawingsList.propTypes = {
  drawings: PropTypes.arrayOf(PropTypes.object),
};
