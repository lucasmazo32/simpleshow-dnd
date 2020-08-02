/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Button({
  areaName, setOffX,
  setOffY, dim, iniPos,
  setReady, test,
}) {
  const [iniX, setIniX] = useState(null);
  const [iniY, setIniY] = useState(null);
  const [finX, setFinX] = useState(null);
  const [finY, setFinY] = useState(null);
  const [targetX, settargetX] = useState(0);
  const [targetY, settargetY] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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
        setLeft((dim.width - dim.aw) / 2 + dim.aw * iniPos.iniLeft);
        setTop(dim.height * iniPos.iniTop);
        setWidth(dim.aw * iniPos.width);
        setHeight(dim.height * iniPos.height);
        if (test) {
          setOffX(dim.aw * iniPos.targetX);
          setOffY(dim.height * iniPos.targetY);
        } else {
          settargetX(dim.aw * iniPos.targetX);
          settargetY(dim.height * iniPos.targetY);
        }
      } else {
        setTop((dim.height - dim.ah) / 2 + dim.ah * iniPos.iniTop);
        setLeft(dim.width * iniPos.iniLeft);
        setWidth(dim.width * iniPos.width);
        setHeight(dim.ah * iniPos.height);
        if (test) {
          setOffX(dim.width * iniPos.targetX);
          setOffY(dim.ah * iniPos.targetY);
        } else {
          settargetX(dim.width * iniPos.targetX);
          settargetY(dim.ah * iniPos.targetY);
        }
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
    if (Math.abs((finX - iniX) - targetX) <= dim.width * 0.015 && Math.abs((finY - iniY) - targetY) <= dim.width * 0.015) {
      setOffX(targetX);
      setOffY(targetY);
      setReady(' ready');
    } else {
      setOffX(0);
      setOffY(0);
    }
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
      style={mouseDown ? {
        width: '100%', height: '100%', left: '0%', top: '0%',
      } : {
        left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`,
      }}
      className="btn btn-drag"
    />
  );
}

Button.propTypes = {
  areaName: PropTypes.string.isRequired,
  setOffX: PropTypes.func.isRequired,
  setOffY: PropTypes.func.isRequired,
  dim: PropTypes.objectOf(PropTypes.number),
  iniPos: PropTypes.objectOf(PropTypes.number).isRequired,
  setReady: PropTypes.func.isRequired,
  test: PropTypes.bool,
};

Button.defaultProps = {
  dim: null,
  test: false,
};
