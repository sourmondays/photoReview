import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AlbumImages = ({ images, handleImagesArray }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="grid-images">
        {images &&
          images.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt="Uploaded" />
              {currentUser ? (
                <input
                  type="checkbox"
                  id={image.id}
                  onChange={handleImagesArray}
                />
              ) : (
                <p>💛 🖤</p>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default AlbumImages;
