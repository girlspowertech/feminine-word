import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated } from '@react-spring/web';

interface CircleTextProps {
  elements: string[];
}

const CircleText: React.FC<CircleTextProps> = ({ elements }) => {
  const [angle, setAngle] = useState(0);
  const radius = 150;
  const maxFontSize = 32;
  const minFontSize = 12;

  const calculateFontSize = (index: number, total: number) => {
    const distanceFromRight = Math.abs((index / total) * 2 * Math.PI - angle);
    const reversedDistance = 2 * Math.PI - distanceFromRight; // Reverse the distance
    return maxFontSize - (reversedDistance / Math.PI) * (maxFontSize - minFontSize);
  };

  const handleClick = (index: number) => {
    const targetAngle = -((index / elements.length) * 2 * Math.PI - Math.PI / 2);
    setAngle(targetAngle);
  };

  const bind = useDrag(({ movement: [mx], down }) => {
    if (down) {
      const theta = Math.atan2(mx, radius);
      setAngle(theta);
    }
  });

  return (
    <div {...bind()} className="circle-container w-96 h-96">
      {elements.map((element, index) => {
        const theta = (index / elements.length) * 2 * Math.PI + angle;
        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta);
        const fontSize = calculateFontSize(index, elements.length);
        return (
          <animated.div
            key={index}
            style={{
              position: 'absolute',
              left: `${x + radius}px`,
              top: `${y + radius}px`,
              fontSize: `${fontSize}px`,
              cursor: 'pointer',
              transform: `translate(-50%, -50%)`,
              textAlign: 'center',
              lineHeight: '1',
              
            }}
            onClick={() => handleClick(index)}
          >
            {element}
          </animated.div>
        );
      })}
    </div>
  );
};

export default CircleText;
