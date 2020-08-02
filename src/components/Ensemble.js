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
import position from '../helpers/buttonPosition';
import '../assets/styles/Ensemble.scss';
import PartContainer from './PartContainer';
import Congrats from './Congrats';

function Ensemble({ start }) {
  const ref = React.createRef();

  const [myclass, setMyClass] = useState('');
  const [answer, setAnswer] = useState([]);
  const [dim, setDim] = useState(null);
  const [congrats, setCongrats] = useState('');

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

  useEffect(() => {
    if (answer.length === 6) {
      setMyClass('');
      setCongrats(' show');
    }
  }, [answer]);

  useEffect(() => {
    if (start) {
      setMyClass(' start');
    }
  }, [start]);

  return (
    <div className={`Ensemble${myclass}`} ref={ref} style={{ backgroundImage: `url(${bg})` }}>
      <div className="general-bg instructions" style={{ backgroundImage: `url(${instructionBox})` }} />
      <PartContainer dim={dim} name="arm1" image={arm1} iniPos={position.arm1} setAnswer={setAnswer} />
      <PartContainer dim={dim} name="arm2" image={arm2} iniPos={position.arm2} setAnswer={setAnswer} />
      <PartContainer dim={dim} name="leg1" image={leg1} iniPos={position.leg1} setAnswer={setAnswer} />
      <PartContainer dim={dim} name="leg2" image={leg2} iniPos={position.leg2} setAnswer={setAnswer} />
      <PartContainer dim={dim} name="head" image={head} iniPos={position.head} setAnswer={setAnswer} />
      <PartContainer dim={dim} name="chest" image={chest} iniPos={position.chest} setAnswer={setAnswer} />
      <div className={`layer${myclass}`} />
      <Congrats congrats={congrats} setCongrats={setCongrats} setMyClass={setMyClass} />
    </div>
  );
}

Ensemble.propTypes = {
  start: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ startReducer: start }) => ({
  start,
});

export default connect(mapStateToProps)(Ensemble);
