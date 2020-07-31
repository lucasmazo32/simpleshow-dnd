import React from 'react';
import bg from '../assets/images/hanger_background-with-parts.svg';
import '../assets/styles/Ensemble.scss';

export default function Ensemble() {
  return (
    <div className="Ensemble" style={{ backgroundImage: `url(${bg})` }}>
      <div className="layer" />
    </div>
  );
}
