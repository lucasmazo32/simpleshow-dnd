import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bg from '../assets/images/hanger_background-with-parts.svg';
import '../assets/styles/Ensemble.scss';

function Ensemble({ start }) {
  const [myclass, setMyclass] = useState('');

  useEffect(() => {
    if (start) {
      setMyclass(' start');
    }
  }, [start]);

  return (
    <div className={`Ensemble${myclass}`} style={{ backgroundImage: `url(${bg})` }}>
      <div className={`layer${myclass}`} />
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
