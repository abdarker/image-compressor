import React from "react";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { formatFileSize } from "../../util/util";
const ImageInfoCard = ({ handleSingleDownload, ...props }) => {
  return (
    <div className="flex bg-white rounded-lg shadow hover:shadow-md overflow-hidden group">
      <div className="relative inline-block cursor-pointer">
        <PhotoView src={props?.content}>
          <div>
            <img
              src={props?.content}
              alt={props?.fileName}
              className="size-[105px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25 invisible group-hover:visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-[#fafafa]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
        </PhotoView>
      </div>

      <div className="flex-1 px-2 py-1">
        <h1 className="line-clamp-1 font-semibold">{props?.fileName}</h1>
        <p className="text-sm text-gray-500">
          Original:{" "}
          <span className="text-[#ff4d4f]">
            {formatFileSize(props?.originalSize)}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Compressed: {""}
          <span className="text-[#0fdd23]">
            {formatFileSize(props?.compressedSize)}{" "}
            <span className="inline-flex">
              (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 mr-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
              {props?.compressRate}%)
            </span>
          </span>
        </p>
        <button
          onClick={() => handleSingleDownload(props?.content)}
          className="rounded-lg bg-[#0fdd23] text-white px-2  inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1 size-[14px]"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span className="text-sm mt-1">Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImageInfoCard;
