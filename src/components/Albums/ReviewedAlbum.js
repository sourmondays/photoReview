import React, { useState } from "react";
import ReviewedImages from "./ReviewedImages";
import { useParams } from "react-router-dom";
import useReviewedImages from "../../hooks/useReviewedImages";
import useSpecReviewed from "../../hooks/useSpecReviewed";
import useClipboard from "react-use-clipboard";

const ReviewedAlbum = () => {
  const { albumId } = useParams();
  const { images } = useReviewedImages(albumId);
  const { album, loading } = useSpecReviewed(albumId);
  const [reviewLink, setReviewLink] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCopied, setCopied] = useClipboard(reviewLink);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/show/reviewed/${album}`;
    setReviewLink(url);
  };

  const handleImagesArray = async (e) => {
    let newImages = [];
    if (e.target.checked === true) {
      if (selectedImages.includes(e.target.id)) {
        return;
      }
      newImages.push(e.target.id);
      setSelectedImages(selectedImages.concat(newImages));
    }
  };

  return (
    <div>
      <h1 className="album-header">{album.title}</h1>

      <div className="buttons-row">
        <div className="inner">
          <div
            className="buttons-allaround"
            onClick={() => {
              handleReviewLink(albumId);
            }}
          >
            Share album
          </div>
        </div>
      </div>

      <div className="buttons-row">
        {reviewLink && (
          <p className="url-share">
            {reviewLink}{" "}
            <button onClick={setCopied} className="buttons-allaround">
              {isCopied ? "Copied" : "Copy link"}
            </button>
          </p>
        )}
      </div>

      <ReviewedImages images={images} handleImagesArray={handleImagesArray} />
    </div>
  );
};

export default ReviewedAlbum;
