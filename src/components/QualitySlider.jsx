import React from "react";

const QualitySlider = ({ value, setValue, handleRangeChange }) => {
  return (
    <div>
      <label className="md:text-lg md:font-semibold font-medium">
        Image Quality: {value / 100}{" "}
        {value / 100 == 0 ? (
          <span className="text-red-500">(Not Recommended)</span>
        ) : value / 100 == 0.2 || value / 100 == 0.4 ? (
          <span className="text-yellow-500">(Modarate)</span>
        ) : value / 100 == 0.6 || value / 100 == 0.8 ? (
          <span className="text-green-500">(Recommended)</span>
        ) : (
          <span className="text-red-500">(Not Recommended)</span>
        )}
      </label>
      <div className="relative mb-6 -mt-1.5">
        <input
          type="range"
          className="range w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          value={value}
          min={0}
          max={100}
          step={20}
          onChange={handleRangeChange}
        />
        <span className="text-sm text-red-500 absolute start-0 -bottom-5">
          0
        </span>
        <span className="text-sm text-yellow-400 absolute start-[20%] -translate-x-1/2 -bottom-5">
          0.2
        </span>
        <span className="text-sm text-yellow-400 absolute start-[40.0%] -translate-x-1/2 -bottom-5">
          0.4
        </span>
        <span className="text-sm text-green-500 absolute start-[60%] -translate-x-1/2 -bottom-5">
          0.6
        </span>
        <span className="text-sm text-green-500 absolute start-[80%] -translate-x-1/2 -bottom-5">
          0.8
        </span>
        <span className="text-sm text-red-500 k absolute end-0 -bottom-5">
          1
        </span>
      </div>
    </div>
  );
};

export default QualitySlider;
