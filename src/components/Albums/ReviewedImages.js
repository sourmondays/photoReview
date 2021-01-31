import React from "react";

const ReviewedImages = ({ images }) => {
  return (
    <>
      <div className="grid-images">
        {images &&
          images.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt="Uploaded" />
            </div>
          ))}
      </div>
    </>
  );
};

export default ReviewedImages;
