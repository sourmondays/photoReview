import React from "react";
import { useParams } from "react-router-dom";
import useReviewedImages from "../../hooks/useReviewedImages";
import ReviewedImages from "../Albums/ReviewedImages";
import useSpecReviewed from "../../hooks/useSpecReviewed";

const ShowReviewed = () => {
  const { albumId } = useParams();
  const { images } = useReviewedImages(albumId);
  const { album, loading } = useSpecReviewed(albumId);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="album-title">{album.title}</h1>

      <div>
        <ReviewedImages images={images} />
      </div>
    </>
  );
};

export default ShowReviewed;
