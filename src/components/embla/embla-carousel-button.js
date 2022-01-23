import React from "react";

export const PrevButton = ({ enabled, onClick }) => (
  <button className="embla-prev" onClick={onClick} disabled={!enabled}>
    <span class="sr-only">Previous</span>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button className="embla-next" onClick={onClick} disabled={!enabled}>
    <span class="sr-only">Next</span>
  </button>
);
