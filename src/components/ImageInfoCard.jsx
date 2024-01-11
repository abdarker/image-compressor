import React from "react";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
const ImageInfoCard = ({ ...props }) => {
  return (
    <div className=" flex bg-white  rounded-lg shadow hover:shadow-md overflow-hidden group">
      <div className="relative inline-block cursor-pointer">
        <PhotoView src={props?.content}>
          <img
            src={props?.content}
            alt={props?.fileName}
            className="size-24 object-cover rounded-lg"
          />
        </PhotoView>
        <div>
          <span className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 invisible group-hover:visible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
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
          </span>
        </div>
      </div>

      <div className="flex-1 px-2 py-1">
        <h1 className="line-clamp-1 font-semibold ">{props?.fileName}</h1>
        <p className="text-sm text-gray-500">
          Original Size:{" "}
          <span className="text-red-500">
            {(props?.originalSize / 1024).toFixed(2)}KB
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Compressed Size: {""}
          <span className=" text-green-500 ">
            {(props?.compressedSize / 1024).toFixed(2)}KB{" "}
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
      </div>
    </div>
  );
};

export default ImageInfoCard;
