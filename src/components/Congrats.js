import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bg from '../assets/images/feedback_overlay-box-large.svg';
import '../assets/styles/Congrats.scss';

export default function Congrats({ congrats, setCongrats, setMyClass }) {
  const ref = React.createRef();

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref) {
      const height = ref.current.offsetHeight;
      const width = ref.current.offsetWidth;
      if (width / height > 16 / 9) {
        const aw = height * (16 / 9);
        setLeft((width - aw) / 2 + 0.745 * aw);
        setTop(height * 0.18);
        setWidth(aw * 0.03);
        setHeight(height * 0.1);
      } else {
        const ah = width * (9 / 16);
        setTop((height - ah) / 2 + ah * 0.15);
        setLeft(0.745 * width);
        setWidth(width * 0.03);
        setHeight(ah * 0.1);
      }
    }
  }, [true]);

  const handleClick = () => {
    setCongrats('');
    setMyClass(' start');
  };

  return (
    <div ref={ref} className={`Congrats${congrats}`} style={{ backgroundImage: `url(${bg})` }}>
      <button
        onClick={handleClick}
        className="btn"
        type="button"
        aria-label="close"
        style={{
          top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`,
        }}
      />
    </div>
  );
}

Congrats.propTypes = {
  congrats: PropTypes.string.isRequired,
  setCongrats: PropTypes.func.isRequired,
  setMyClass: PropTypes.func.isRequired,
};
