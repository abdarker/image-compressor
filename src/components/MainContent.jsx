import Compressor from "compressorjs";
import React, { useState } from "react";
const MainContent = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionRate, setCompressionRate] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    handleImage(file);
  };

  const handleImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setOriginalImage(reader.result);
      };

      new Compressor(file, {
        strict: true,
        checkOrientation: true,
        retainExif: false,
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        resize: "none",
        quality: 0.8,
        mimeType: "",
        convertTypes: "image/png",
        convertSize: 5000000, 
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            setCompressedImage(reader.result);

            // Calculate compression rate
            const originalSize = file.size;
            const compressedSize = result.size;
            const rate = ((originalSize - compressedSize) / originalSize) * 100;
            setCompressionRate(rate.toFixed(2));
          };
        },
        error(err) {
          console.error("Compression failed:", err);
        },
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatToKB = (file) => {
    return 
  };

  
  return (
    <div className="container relative mx-auto px-4">
      <div
        className="flex justify-center items-center w-2/3 h-48 border-2 border-dashed rounded-lg p-5"
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & drop an image here or click to select one.</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">Select Image</label>
      </div>
      <div>
        {originalImage && (
          <div>
            <h3>Original Image:</h3>
            <img src={originalImage} alt="Original" width="300" />
            <p>File Size: {new Blob([originalImage]).size} bytes</p>
          </div>
        )}
        {compressedImage && (
          <div>
            <h3>Compressed Image:</h3>
            <img src={compressedImage} alt="Compressed" width="300" />
            <p>File Size: {new Blob([compressedImage]).size} bytes</p>
            <p>Compression Rate: {compressionRate}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
