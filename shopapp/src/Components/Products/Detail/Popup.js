// Popup.js
import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Popup = ({ info, color, onClose }) => {
  const slideInAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <animated.div
      style={slideInAnimation}
      className={`fixed top-4 left-4 p-4 rounded-md ${
        color === 'green' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <p>{info}</p>
      <button onClick={onClose} className="ml-2 text-white font-bold">
        x
      </button>
    </animated.div>
  );
};

export default Popup;
