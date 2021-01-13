import React, { useState } from "react";
import AlbumImages from "./AlbumImages";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";
import ImageDropZone from "../Upload/ImageDropZone";
import { Link } from "react-router-dom";
import useAlbum from "../../hooks/useAlbum";
import useClipboard from "react-use-clipboard";

const Album = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const { album, loading } = useAlbum(albumId);
  const [reviewLink, setReview] = useState(null);
  const [isCopied, setCopied] = useClipboard(reviewLink);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/review/${album}`;
    setReview(url);
  };

  return (
    <div>
      <h1 className="album-title">{album.title}</h1>

      <div className="buttons-row">
        <div className="inner">
          <Link
            className="buttons-allaround"
            to={`/album/editalbum/${albumId}`}
          >
            Edit album
          </Link>
        </div>
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
        <div className="inner">
          <Link
            className="buttons-allaround"
            to={`/album/editalbum/${albumId}`}
          >
            Edit album
          </Link>
        </div>
      </div>

      <ImageDropZone albumId={albumId} />

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

      <AlbumImages images={images} />
    </div>
  );
};

export default Album;
