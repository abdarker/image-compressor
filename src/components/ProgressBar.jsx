import React from "react";

const ProgressBar = ({ width }) => {
  return (
    <>
      <span className="text-xs">{width}%</span>
      <div className="w-full bg-gray-200 rounded-full h-1 -mt-1">
        <div
          className="bg-black h-1 rounded-full text-xs"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
