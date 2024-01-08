import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Compressor from "compressorjs";
import React, { useState } from "react";
const MainContent = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionRate, setCompressionRate] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [originalFileSize, setOriginalFileSize] = useState(null);
  const [compressedFileSize, setCompressedFileSize] = useState(null);

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
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
        const fileName = file.name;
        setUploadedFileName(fileName);
      };

      new Compressor(file, {
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: 0.8,

        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            setCompressedImage(reader.result);

            // Calculate compression rate
            const originalSize = file.size;
            setOriginalFileSize(originalSize);
            const compressedSize = result.size;
            setCompressedFileSize(compressedSize);
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
  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = compressedImage;
    downloadLink.download = `compressed_${uploadedFileName}`;
    downloadLink.click();
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4">
      <div
        className={`flex justify-center items-center w-2/3 h-48 border-2 border-dashed rounded-lg p-5
        ${isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"}`}
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p
          className={`text-sm ${
            isDragActive ? "text-sky-800" : "text-gray-400"
          }  `}
        >
          {isDragActive
            ? "Leave Your File Here"
            : "Drag and drop your files here"}
        </p>
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
            <p>File Name: {uploadedFileName}</p>
            <p>File Size: {(originalFileSize / 1024).toFixed(2)} KB</p>
          </div>
        )}
        {compressedImage && (
          <div>
            <h3>Compressed Image:</h3>
            <img src={compressedImage} alt="Compressed" width="300" />
            <p>Compressed File Name: compressed_{uploadedFileName}</p>
            <p>File Size: {(compressedFileSize / 1024).toFixed(2)} KB</p>
            <p>Compression Rate: {compressionRate}%</p>
            <button onClick={handleDownload}>Download Compressed Image</button>
          </div>
        )}
      </div>
      <div>
        <ImgComparisonSlider>
          <img slot="first" src={originalImage} width="100%" />
          <img slot="second" src={compressedImage} width="100%" />
        </ImgComparisonSlider>
      </div>
    </div>
  );
};

export default MainContent;
