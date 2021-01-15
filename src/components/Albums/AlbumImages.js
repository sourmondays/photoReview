import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const AlbumImages = ({ images, handleImagesArray, updateLikedImages }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="grid-images">
        {images &&
          images.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt="Uploaded" />
              {currentUser ? (
                <label className="container-checkbox">
                  <input
                    type="checkbox"
                    id={image.id}
                    onChange={handleImagesArray}
                  />
                  <div className="checkmark"></div>
                </label>
              ) : (
                <div className="likes">
                  <button
                    className="iLikeThis"
                    onClick={() => updateLikedImages(image, true)}
                  >
                    💛
                  </button>
                  <button
                    className="iDislikeThis"
                    onClick={() => updateLikedImages(image, false)}
                  >
                    🖤
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default AlbumImages;
