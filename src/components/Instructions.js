import React, { useState, useEffect } from 'react';
import bg from '../assets/images/start_overlay-box-large.svg';
import '../assets/styles/Instructions.scss';

export default function Instructions() {
  const ref = React.createRef();

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
      setwidth(aw / 9);
      setleft(screenwidth / 2 - aw / 18);
      setbottom(screenheight / 6);
      setheight(screenheight / 14);
    } else {
      const ah = (screenwidth * 9) / 16;
      setwidth(screenwidth / 9);
      setleft((screenwidth * 8) / 18);
      setheight(ah / 14);
      setbottom(screenheight / 2 - ah / 3);
    }
  }, [screenheight, screenwidth]);

  window.onresize = () => {
    setscreenchange(state => !state);
  };

  return (
    <div ref={ref} className="Instructions" style={{ backgroundImage: `url(${bg})` }}>
      <button
        className="btn btn-start"
        type="button"
        aria-label="start"
        style={{ width: `${width}px`, left: `${left}px`, height: `${height}px`, bottom: `${bottom}px` }}
      />
    </div>
  );
}
