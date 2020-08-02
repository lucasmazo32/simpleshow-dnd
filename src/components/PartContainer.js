import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function PartContainer({
  dim, name, image,
  iniPos, setAnswer,
  test,
}) {
  const [offX, setOffX] = useState(0);
  const [offY, setOffY] = useState(0);
  const [ready, setReady] = useState('');

  useEffect(() => {
    if (ready === ' ready') {
      setAnswer(arr => [...arr, name]);
    }
  }, [ready]);

  return (
    <div className={`general-bg draggable ${name}${ready}`} style={{ backgroundImage: `url(${image})`, top: `${offY}px`, left: `${offX}px` }}>
      <Button
        areaName={name}
        setOffX={setOffX}
        setOffY={setOffY}
        dim={dim}
        iniPos={iniPos}
        setReady={setReady}
        test={test}
      />
    </div>
  );
}

PartContainer.propTypes = {
  dim: PropTypes.objectOf(PropTypes.number),
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  iniPos: PropTypes.objectOf(PropTypes.number).isRequired,
  setAnswer: PropTypes.func.isRequired,
  test: PropTypes.bool,
};

PartContainer.defaultProps = {
  dim: null,
  test: false,
};
