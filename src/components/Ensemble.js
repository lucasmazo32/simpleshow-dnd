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
import Button from './Button';

function Ensemble({ start }) {
  const ref = React.createRef();

  // const [myclass, setMyClass] = useState('');
  const [offX, setOffX] = useState(0);
  const [offY, setOffY] = useState(0);
  const [dim, setDim] = useState(null);

  useEffect(() => {
    if (ref) {
      const height = ref.current.offsetHeight;
      const width = ref.current.offsetWidth;
      if (width / height > 16 / 9) {
        const aw = height * (16 / 9);
        setDim({ height, width, aw });
      } else {
        const ah = width * (9 / 16);
        setDim({ height, width, ah });
      }
    }
  }, [true]);

  // useEffect(() => {
  //   if (start) {
  //     setMyclass(' start');
  //   }
  // }, [start]);

  return (
    <div className="Ensemble start" ref={ref} style={{ backgroundImage: `url(${bg})` }}>
      <div className="general-bg instructions" style={{ backgroundImage: `url(${instructionBox})` }} />
      <div className="general-bg draggable arm1" style={{ backgroundImage: `url(${arm1})`, top: `${offY}px`, left: `${offX}px` }}>
        <Button areaName="arm1" setOffX={setOffX} setOffY={setOffY} dim={dim} />
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
