import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions/index';
import bg from '../assets/images/start_overlay-box-large.svg';
import '../assets/styles/Instructions.scss';

const { setStart } = actions;

function Instructions({ setStart }) {
  const ref = React.createRef();

  const [myclass, setmyclass] = useState('');
  const [screenchange, setscreenchange] = useState(true);
  const [screenwidth, setscreenwidth] = useState(0);
  const [screenheight, setscreenheight] = useState(0);
  const [width, setwidth] = useState(0);
  const [height, setheight] = useState(0);
  const [bottom, setbottom] = useState(0);
  const [left, setleft] = useState(0);

  useEffect(() => {
    if (ref) {
      setscreenheight(ref.current.offsetHeight);
      setscreenwidth(ref.current.offsetWidth);
    }
  }, [ref, screenchange]);

  useEffect(() => {
    if (screenwidth / screenheight > 16 / 9) {
      const aw = screenheight * (16 / 9);
      setwidth(aw / 8);
      setleft(screenwidth / 2 - aw / 16);
      setbottom(screenheight / 6.6);
      setheight(screenheight / 10);
    } else {
      const ah = (screenwidth * 9) / 16;
      setwidth(screenwidth / 8);
      setleft((screenwidth * 7) / 16);
      setheight(ah / 10);
      setbottom(screenheight / 2 - ah / 2.87);
    }
  }, [screenheight, screenwidth]);

  const handleClick = () => {
    setmyclass(' start');
    setStart();
  };

  window.onresize = () => {
    setscreenchange(state => !state);
  };

  return (
    <div ref={ref} className={`Instructions${myclass}`} style={{ backgroundImage: `url(${bg})` }}>
      <button
        onClick={handleClick}
        className="btn btn-start"
        type="button"
        aria-label="start"
        style={{
          width: `${width}px`,
          left: `${left}px`,
          height: `${height}px`,
          bottom: `${bottom}px`,
        }}
      />
    </div>
  );
}

Instructions.propTypes = {
  setStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setStart: () => dispatch(setStart()),
});

export default connect(null, mapDispatchToProps)(Instructions);
