import React from "react";
import "./Loader.css"; // Add your styles here or use a CSS-in-JS library

const Loader = () => (
  <div className="loader-container">
    <svg viewBox="0 0 400 160">
      <text x="50%" y="50%" textAnchor="middle" className="text-body">
        Petopia
      </text>
      <text x="50%" y="50%" dx="1.9em" textAnchor="middle" className="text-body">
        .
      </text>
    </svg>
  </div>
);

export default Loader;
