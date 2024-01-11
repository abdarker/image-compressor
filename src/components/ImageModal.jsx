import React from "react";

const ImageModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`modal ${
        isOpen ? "fixed inset-0 flex items-center justify-center " : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div
        className="modal-container bg-white w-1/2 p-6 rounded-lg shadow-lg z-40"
        onClick={onClose}
      >
        <span className="close absolute top-0 right-0 p-4">&times;</span>
        <div className="modal-content ">
          <p>Your modal content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
