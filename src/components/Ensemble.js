import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bg from '../assets/images/hanger_background.svg';
import instructionBox from '../assets/images/instruction_box.svg';
import arm1 from '../assets/images/simplemech-arm1.svg';
import arm2 from '../assets/images/simplemech-arm2.svg';
import leg1 from '../assets/images/simplemech-leg1.svg';
import leg2 from '../assets/images/simplemech-leg2.svg';
import head from '../assets/images/simplemech-head.svg';
import chest from '../assets/images/simplemech-chest.svg';
import '../assets/styles/Ensemble.scss';

function Ensemble({ start }) {
  // const [myclass, setMyClass] = useState('');
  const [mouseDown, setmouseDown] = useState(false);
  const [offX, setOffX] = useState(0);
  const [offY, setOffY] = useState(0);
  const [iniX, setIniX] = useState(null);
  const [iniY, setIniY] = useState(null);
  const [finX, setFinX] = useState(null);
  const [finY, setFinY] = useState(null);

  // useEffect(() => {
  //   if (start) {
  //     setMyclass(' start');
  //   }
  // }, [start]);

  useEffect(() => {
    if (finX && iniX) {
      setOffX(finX - iniX);
    }
    if (finY && iniY) {
      setOffY(finY - iniY);
    }
  }, [iniX, iniY, finX, finY]);

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
    <div className="Ensemble start" style={{ backgroundImage: `url(${bg})` }}>
      <div className="general-bg instructions" style={{ backgroundImage: `url(${instructionBox})` }} />
      <div className="general-bg draggable arm1" style={{ backgroundImage: `url(${arm1})`, top: `${offY}px`, left: `${offX}px` }}>
        <button
          onMouseDown={handleArm1}
          onMouseMove={elementDrag}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={mouseDown ? {
            width: '100%', height: '100%', left: '0%', top: '0%',
          } : null}
          type="button"
          className="btn btn-drag"
          aria-label="arm1"
        />
      </div>
      <div className="general-bg arm2" style={{ backgroundImage: `url(${arm2})` }} />
      <div className="general-bg leg1" style={{ backgroundImage: `url(${leg1})` }} />
      <div className="general-bg leg2" style={{ backgroundImage: `url(${leg2})` }} />
      <div className="general-bg head" style={{ backgroundImage: `url(${head})` }} />
      <div className="general-bg chest" style={{ backgroundImage: `url(${chest})` }} />
      <div className="layer start" />
    </div>
    // <div className={`Ensemble${myclass}`} style={{ backgroundImage: `url(${bg})` }}>
    //   <div className={`layer${myclass}`} />
    // </div>
  );
}

Ensemble.propTypes = {
  start: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ startReducer: start }) => ({
  start,
});

export default connect(mapStateToProps)(Ensemble);
