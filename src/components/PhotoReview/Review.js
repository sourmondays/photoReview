import React from "react";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";
import AlbumImages from "../Albums/AlbumImages";
import useAlbum from "../../hooks/useAlbum";

const Review = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const { album, loading } = useAlbum(albumId);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="album-title">{album.title}</h1>

      <div>
        <AlbumImages images={images} />
      </div>
    </>
  );
};

export default Review;
