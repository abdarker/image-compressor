import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Compressor from "compressorjs";
import JSZip from "jszip";
import React, { useState } from "react";
import Intro from "./Intro";

const MainContent = () => {
  const [compressedImages, setCompressedImages] = useState([]);
  const [zipFile, setZipFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleImageDrop = async (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    await handleImages(files);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    await handleImages(files);
  };

  const handleImages = async (files) => {
    const compressedImgs = [];
    const zip = new JSZip();
    const img = zip.folder("compressed_images");
    for (const file of files) {
      const compressedImg = await compressImage(file);
      compressedImgs.push(compressedImg);
      const response = await fetch(compressedImg);
      const blob = await response.blob();
      img.file(`compressed_${file.name}`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    setZipFile(zipBlob);
    setCompressedImages(compressedImgs);
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
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
            resolve(reader.result);
          };
        },
        error(err) {
          reject(err);
        },
      });
    });
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
    if (zipFile) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(zipFile);
      downloadLink.download = "compressed_images.zip";
      downloadLink.click();
    }
  };

  return (
    <div className="container  mx-auto px-4">
      <Intro />
      <div className="">
        <div
          className={`flex justify-center items-center  h-40 border-2 border-dashed rounded-lg 
        ${isDragActive ? "bg-gray-100 border-black" : "border-gray-300"}`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {/* Your drop area content */}

          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-input"
          />

          <label
            htmlFor="file-input"
            className={`text-lg cursor-pointer ${
              isDragActive ? "text-sky-800" : "text-gray-400"
            }`}
          >
            Click or drag file to this area to upload
          </label>
        </div>
        {/* Display compressed images */}
        <div>
          {compressedImages?.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Compressed-${index}`} width="300" />
            </div>
          ))}
        </div>
        {/* Button to download the zip file */}
        <div>
          <button onClick={handleDownload}>
            Download Compressed Images (ZIP)
          </button>
        </div>
        {/* Image comparison slider */}
        <div>
          <ImgComparisonSlider>
            {/* You can add your original and compressed images here */}
          </ImgComparisonSlider>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
