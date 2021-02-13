import React from "react";

const ImageLightbox = ({ selectedImgLightbox, setSelectedImgLightbox }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImgLightbox(null);
    }
  };

  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImgLightbox} alt="Lightbox" />
    </div>
  );
};

export default ImageLightbox;
