import React from 'react';
import { useSpring, animated } from 'react-spring';

function NotFoundPage() {
  const shakeProps = useSpring({
    from: { x: -10 },
    to: { x: 10 },
    config: { duration: 1000, loop: true },
  });

  return (
    <div className="bg-gray-800 text-white" style={{ backgroundColor: '#313131' }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">404 - Page Not Found</h1>

        <animated.div style={{ ...shakeProps, textAlign: 'center' }}>
          <div className="text-center">
            <span className="text-9xl text-indigo-600 font-bold">404</span>
          </div>
        </animated.div>

        <p className="text-gray-300 text-center mt-6">
          Oops! It looks like you've wandered into uncharted territory.
        </p>

        <p className="text-gray-300 text-center mt-6">
          Don't worry; you can find your way back to our <a href="/">home page</a>.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
