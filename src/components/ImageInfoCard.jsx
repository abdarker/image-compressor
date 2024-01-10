import React from "react";

const ImageInfoCard = ({ ...props }) => {
  return (
    <div className="cursor-pointer flex bg-white  rounded-lg shadow hover:shadow-md overflow-hidden">
      <img
        src="https://picsum.photos/500/900"
        alt=""
        className="size-20 object-cover rounded-lg"
      />

      <div className="flex-1 px-2 py-1">
        <h1 className="line-clamp-1 font-semibold ">
          Optimizes images locally , delivering unmatched efficiency without
          storing a single file.Experience lightning-fast compression, all in
          one place.
        </h1>
        <p className="text-sm text-gray-500">
          Original File Size: <span className="text-red-500">800KB</span>
        </p>
        <p className="text-sm text-gray-500">
          Compressed File Size: {""}
          <span className=" text-green-500 ">
            740KB{" "}
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
              41.77% off )
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ImageInfoCard;
