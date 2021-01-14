import React, { useState } from "react";
import AlbumImages from "./AlbumImages";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";
import ImageDropZone from "../Upload/ImageDropZone";
import { Link } from "react-router-dom";
import useAlbum from "../../hooks/useAlbum";
import useClipboard from "react-use-clipboard";
import { db, timestamp } from "../../firebase/firebaseConfiq";
import firebase from "../../firebase/firebaseConfiq";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Album = () => {
  const { currentUser } = useAuth();
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const { album, loading } = useAlbum(albumId);
  const { error, setError } = useState(false);
  const [reviewLink, setReview] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCopied, setCopied] = useClipboard(reviewLink);
  const [title, setTitle] = useState("");
  const [changeTitle, setChangeTitle] = useState(false);
  const history = useHistory();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleReviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/review/${album}`;
    setReview(url);
  };

  const handleAlbumName = (e) => {
    setTitle(e.target.value);
  };

  const handleNewAlbumFromImages = async (e) => {
    e.preventDefault();

    const createdAt = timestamp();
    try {
      const docReference = await db.collection("albums").add({
        title,
        createdAt,
        owner: currentUser.uid,
      });

      await selectedImages.forEach((image) => {
        db.collection("images")
          .doc(image)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docReference.id)
            ),
          });
      });
      history.push(`/albums`);
    } catch (error) {
      setError(error.message);
    }
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
          <div
            onClick={() => {
              setChangeTitle(!changeTitle);
            }}
            className="buttons-allaround"
          >
            {changeTitle ? "Close" : "New album"}
          </div>
        </div>
      </div>

      {changeTitle && (
        <form onSubmit={handleNewAlbumFromImages}>
          <div className="style-this-box">
            <label htmlFor="album">
              <p className="header-desc">Create a new album</p>
            </label>
            <input
              type="text"
              name="album"
              onChange={handleAlbumName}
              value={title}
              required
            />

            {error && <p className="error">{error}</p>}
            {title && title.length < 4 && (
              <p className="error">
                Please enter a title at least 4 characters long.
              </p>
            )}

            <button
              disabled={loading}
              className="buttons-allaround"
              type="submit"
            >
              Create new album
            </button>
          </div>
        </form>
      )}

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

      <AlbumImages images={images} handleImagesArray={handleImagesArray} />
    </div>
  );
};

export default Album;
