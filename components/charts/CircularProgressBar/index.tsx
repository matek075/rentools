import React from 'react';
import clsx from 'clsx';

import css from './styles.module.scss';

interface OwnProps {
  value: number;
  size: number;
  strokeWidth: number;
  color?: 'red' | 'yellow' | 'green';
}

const CircularProgressBar: React.FC<OwnProps> = ({ value, size, strokeWidth, color }) => {
  // Size of the enclosing square
  const sqSize = size;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (size - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - dashArray * value / 100;

  return (
    <svg
      className={clsx(css.svg, { [css.red]: color === 'red', [css.green]: color === 'green' })}
      width={size}
      height={size}
      viewBox={viewBox}>
      <circle
        className={css.circleBackground}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`} />
      <circle
        className={css.circleProgress}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }} />
      <text
        className={css.circleText}
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle">
        {`${value}%`}
      </text>
    </svg>
  );
}

export default CircularProgressBar;
