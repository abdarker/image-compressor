import Compressor from "compressorjs";
import JSZip from "jszip";
import React, { useState } from "react";
import { PhotoProvider } from "react-photo-view";
import ImageInfoCard from "./ImageInfoCard";
import Intro from "./Intro";
import LoadingSpinner from "./LoadingSpinner";
import QualitySlider from "./QualitySlider";

const MainContent = () => {
  const [compressedImages, setCompressedImages] = useState([]);
  const [zipFile, setZipFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(80); // Initial value

  const handleRangeChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

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
    setLoading(true);
    const compressedImgs = [];
    const zip = new JSZip();
    const img = zip.folder("compressed_images");
    for (const file of files) {
      const compressedImg = await compressImage(file);
      //   compressedImgs.push(compressedImg);
      const base64Data = compressedImg.split(",")[1];
      const binaryData = atob(base64Data);
      // Get the length of the binary data
      const compressedDataSize = binaryData.length;
      const rate = ((file.size - compressedDataSize) / file.size) * 100;
      compressedImgs.push({
        fileName: "compressed_" + file.name.substring(0, 10) + "...",
        originalSize: file.size,
        compressedSize: compressedDataSize,
        fileType: file.type,
        content: compressedImg,
        compressRate: rate.toFixed(2),
      });
      const response = await fetch(compressedImg);
      const blob = await response.blob();
      img.file(`compressed_${file.name}`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    setZipFile(zipBlob);
    setCompressedImages(compressedImgs);
    setLoading(false);
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
        quality: value / 100,

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
      <QualitySlider
        value={value}
        handleRangeChange={handleRangeChange}
        setValue={setValue}
      />
      <div className="">
        <label
          className={`flex justify-center items-center cursor-pointer h-30 md:40 border-2 border-dashed rounded-lg
        ${isDragActive ? "bg-gray-100 border-gray-700" : "border-gray-300"}`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="file-input"
        >
          {/* Your drop area content */}
          <div className="flex flex-col items-center justify-center py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-9 h-9 md:mb-2 ${
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
              className={`md:mb-2 md:text-lg  ${
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
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PhotoProvider>
              {compressedImages?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                  {compressedImages?.map((image, i) => (
                    <ImageInfoCard key={i} {...image} />
                  ))}
                </div>
              )}
            </PhotoProvider>

            {compressedImages?.length > 0 && (
              <div>
                <button
                  className="inline-flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
                  onClick={handleDownload}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-1 size-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span className="mt-1">Download All Images (ZIP)</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
