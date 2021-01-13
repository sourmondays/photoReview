import React from "react";

const AlbumImages = ({ images }) => {
  return (
    <div>
      {/* <p>{images.length}</p> */}
      <div className="img-grid mt-5">
        {images &&
          images.map((image) => (
            <div className="img-wrap" key={image.id}>
              <img src={image.url} alt="Uploaded" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumImages;
