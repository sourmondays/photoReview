import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useReviewedImages from "../../hooks/useReviewedImages";
import ReviewedImages from "../Albums/ReviewedImages";
import useSpecReviewed from "../../hooks/useSpecReviewed";
import ImageLightbox from "../Lightbox/ImageLightbox";

const ShowReviewed = () => {
  const { albumId } = useParams();
  const { images } = useReviewedImages(albumId);
  const { album, loading } = useSpecReviewed(albumId);
  const [selectedImgLightbox, setSelectedImgLightbox] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="album-title">{album.title}</h1>

      <div>
        <ReviewedImages
          setSelectedImgLightbox={setSelectedImgLightbox}
          images={images}
        />
        {selectedImgLightbox && (
          <ImageLightbox
            selectedImgLightbox={selectedImgLightbox}
            setSelectedImgLightbox={setSelectedImgLightbox}
          />
        )}
      </div>
    </>
  );
};

export default ShowReviewed;
