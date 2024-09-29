"use client";

import React from 'react';

const BalancedShadedRectangles = () => {
  const generateRectangles = (count: number, sizeRange: [number, number], yRange: [number, number]) => {
    const rects = [];
    const xStep = 100 / count;
    
    for (let i = 0; i < count; i++) {
      rects.push({
        id: i,
        x: i * xStep + Math.random() * (xStep / 2) - xStep / 4,
        y: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
        width: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        height: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        rotation: Math.random() * 20 - 10,
      });
    }
    return rects;
  };

  const largeRectangles = generateRectangles(6, [40, 60], [60, 90]);
  const mediumRectangles = generateRectangles(10, [25, 40], [70, 95]);
  const smallRectangles = generateRectangles(15, [15, 25], [80, 98]);

  const allRectangles = [...largeRectangles, ...mediumRectangles, ...smallRectangles];

  return (
    <div className="fixed inset-x-0 bottom-0 w-full h-2/5">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="redGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,0,0,0.8)" />
            <stop offset="100%" stopColor="rgba(255,0,0,0.2)" />
          </radialGradient>
        </defs>
        {allRectangles.map((rect, index) => (
          <rect
            key={`${rect.id}-${index}`}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            rx="5"
            ry="5"
            fill="url(#redGradient)"
            transform={`rotate(${rect.rotation} ${rect.x + rect.width / 2} ${rect.y + rect.height / 2})`}
          />
        ))}
      </svg>
    </div>
  );
};

export default BalancedShadedRectangles;