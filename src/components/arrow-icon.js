import React from "react";

const arrowIcon = () => {
  const direction = "right";

  return (
    <span className="arrow-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 22"
        width="16"
        style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}
      >
        <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd">
          <path d="M30 1 L41 11 30 21 M2 11h39"></path>
        </g>
      </svg>
    </span>
  );
};

export default arrowIcon;
