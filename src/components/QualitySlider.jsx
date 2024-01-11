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
      <label htmlFor="slider">Value: {value}</label>
      <br />
      <input
        type="range"
        id="slider"
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
