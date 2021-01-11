import React from "react";

const AlbumImages = ({ images }) => {
  return (
    <div>
      <p>{images.length}</p>
      {images.length !== 0 &&
        images.map((image) => (
          <div className="img-wrap" key={image.id}>
            {/* <img src={image.length} alt="Uploaded" /> */}
            <p>{images.length}</p>
          </div>
        ))}
    </div>
  );
};

export default AlbumImages;
