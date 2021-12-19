import React from "react";

export const PrevButton = ({ enabled, onClick }) => (
  <button className="embla-prev" onClick={onClick} disabled={!enabled}>
    <svg
      aria-hidden="true"
      role="presentation"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
      </g>
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button className="embla-next" onClick={onClick} disabled={!enabled}>
    <svg
      aria-hidden="true"
      role="presentation"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
      </g>
    </svg>
  </button>
);
