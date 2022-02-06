import React from "react";

export const PrevButton = ({ enabled, onClick }) => (
  // https://stackoverflow.com/questions/3100319/event-on-a-disabled-input
  // https://jsfiddle.net/3zLeats8/ (mine)
  // Custom cursor needs mouse move event - which isn't fired in Chrome when the button is disabled
  <button className="embla-prev" onClick={onClick} readOnly={!enabled}>
    <span className="sr-only">Previous</span>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button className="embla-next" onClick={onClick} readOnly={!enabled}>
    <span className="sr-only">Next</span>
  </button>
);
