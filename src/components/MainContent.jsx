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
        <label
          className={`flex justify-center items-center cursor-pointer h-40 border-2 border-dashed rounded-lg 
        ${isDragActive ? "bg-gray-100 border-gray-700" : "border-gray-300"}`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="file-input"
        >
          {/* Your drop area content */}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-9 h-9 mb-2 ${
                isDragActive ? "text-gray-700" : "text-gray-500"
              } `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <p
              className={`mb-2 text-lg  ${
                isDragActive ? "text-gray-700" : "text-gray-500"
              } `}
            >
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className=" text-gray-500 ">jpg, jpeg, png, webp</p>
          </div>

          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-input"
          />
        </label>

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
