/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Button({
  areaName, setOffX, setOffY, dim,
}) {
  const [iniX, setIniX] = useState(null);
  const [iniY, setIniY] = useState(null);
  const [finX, setFinX] = useState(null);
  const [finY, setFinY] = useState(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [mouseDown, setmouseDown] = useState(false);

  useEffect(() => {
    if (finX && iniX) {
      setOffX(finX - iniX);
    }
    if (finY && iniY) {
      setOffY(finY - iniY);
    }
  }, [iniX, iniY, finX, finY, setOffY, setOffX]);

  useEffect(() => {
    if (dim) {
      if (dim.aw) {
        setLeft((dim.width - dim.aw) / 2);
      } else {
        setTop((dim.height - dim.ah) / 2);
      }
    }
  }, [dim]);

  const elementDrag = e => {
    e.preventDefault();
    if (mouseDown) {
      setFinX(e.clientX);
      setFinY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setmouseDown(false);
    setIniX(null);
    setIniY(null);
    setFinY(null);
    setFinX(null);
  };

  const handleArm1 = e => {
    e.preventDefault();
    setIniX(e.clientX);
    setIniY(e.clientY);
    setmouseDown(true);
  };

  return (
    <button
      type="button"
      aria-label={areaName}
      onMouseDown={handleArm1}
      onMouseMove={elementDrag}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={mouseDown ? {
        width: '100%', height: '100%', left: '0%', top: '0%',
      } : { left: `${left}px`, top: `${top}px` }}
      className="btn btn-drag"
    />
  );
}

Button.propTypes = {
  areaName: PropTypes.string.isRequired,
  setOffX: PropTypes.func.isRequired,
  setOffY: PropTypes.func.isRequired,
  dim: PropTypes.objectOf(PropTypes.number),
};

Button.defaultProps = {
  dim: null,
};
