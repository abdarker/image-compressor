import React, { useState } from "react";

const QualitySlider = () => {
  const [value, setValue] = useState(10); // Initial value

  const handleChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };
  console.log("My Log: ", value / 100);

  return (
    <div>
      <h2>Single Slider Example</h2>
      <label>Value: {value}</label>
      <br />
      <input
        type="range"
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm "
        value={value}
        min={10}
        max={90}
        step={10}
        onChange={handleChange}
      />
    </div>
  );
};

export default QualitySlider;
