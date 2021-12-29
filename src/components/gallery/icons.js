import React from "react";

const Icons = {
  grid: () => {
    return (
      <svg viewBox="0 0 19 19" aria-hidden="true">
        <g fill="none" stroke="none">
          <rect
            x="0"
            y="0"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="7"
            y="0"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="14"
            y="0"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="0"
            y="7"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="7"
            y="7"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="14"
            y="7"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="0"
            y="14"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="7"
            y="14"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
          <rect
            x="14"
            y="14"
            width="5"
            height="5"
            fill="currentColor"
            stroke="none"
          ></rect>
        </g>
      </svg>
    );
  },
  list: () => {
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect fill="currentColor" width="100" height="20" />
        <rect fill="currentColor" y="40" width="50" height="20" />
        <rect fill="currentColor" y="80" width="85" height="20" />
      </svg>
    );
  },
  map: () => {
    return (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
        />
      </svg>
    );
  },
};

export default Icons;
