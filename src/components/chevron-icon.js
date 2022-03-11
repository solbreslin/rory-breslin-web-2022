import React from "react";

const ChevronIcon = ({ direction, color }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="14.83px"
      height="8.83px"
      style={{ transform: `rotate(${direction === "up" ? 180 : 0}deg)` }}
    >
      <polyline
        points="1.41,1.41 7.41,7.41 13.41,1.41"
        fill="none"
        stroke={color ? color : "var(--rb-text-color)"}
        strokeWidth="2"
        strokeLinecap="square"
      ></polyline>
    </svg>
  );
};

export default ChevronIcon;
