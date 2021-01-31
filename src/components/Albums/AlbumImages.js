import React from "react";
import { IoIosHeart, IoMdHeartDislike } from "react-icons/io";
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
                <div id={image.id} className="likes">
                  <button
                    className="iDislikeThis"
                    onClick={() => updateLikedImages(image, false)}
                  >
                    <IoMdHeartDislike className="heart-dislike" size="2em" />
                  </button>
                  <button
                    className="iLikeThis"
                    onClick={() => updateLikedImages(image, true)}
                  >
                    <IoIosHeart className="heart-like" size="2em" />
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
