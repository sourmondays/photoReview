import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useImages from "../../hooks/useImages";
import AlbumImages from "../Albums/AlbumImages";
import useAlbum from "../../hooks/useAlbum";
import firebase from "../../firebase/firebaseConfiq";
import { db, timestamp } from "../../firebase/firebaseConfiq";
import ImageLightbox from "../Lightbox/ImageLightbox";

const Review = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [likedImage, setLikedImage] = useState([]);
  const [reviewImage, setReviewImage] = useState([]);
  const { album, loading } = useAlbum(albumId);
  const [selectedImgLightbox, setSelectedImgLightbox] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getImages() {
      const imagesList = await Promise.all(
        images.map((image) => {
          return {
            id: image.id,
            like: undefined,
          };
        })
      );
      setReviewImage(imagesList);
    }
    getImages();
  }, [images]);

  useEffect(() => {
    let allLikedImages = reviewImage.filter((image) => {
      return image.like === true;
    });
    setLikedImage(allLikedImages);

    let result = reviewImage.every((image) => image.like !== undefined);
    if (result === false) {
      setDisabled(true);
      return;
    } else if (result === true) {
      setDisabled(false);
    }
  }, [reviewImage]);

  const handleReview = async () => {
    const date = new Date();
    const title = `${album.title} | Reviewed: ${date
      .toISOString()
      .substring(0, 10)}`;

    setError(false);
    const createdAt = timestamp();

    try {
      const docRef = await db.collection("reviewed").add({
        title,
        owner: album.owner,
        createdAt: createdAt,
        cover: album.cover,
      });

      await likedImage.forEach((image) => {
        db.collection("images")
          .doc(image.id)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            ),
          });
      });
      history.push(`/thankyou`);
    } catch (error) {
      setError(error.message);
    }
  };

  const hearts = (id, liked) => {
    let div = document.getElementById(id);
    if (liked === true) {
      div
        .getElementsByClassName("iLikeThis")[0]
        .classList.add("iLikeThis-active");
      div
        .getElementsByClassName("iDislikeThis")[0]
        .classList.remove("iDislikeThis-active");
    } else if (liked === false) {
      div
        .getElementsByClassName("iDislikeThis")[0]
        .classList.add("iDislikeThis-active");
      div
        .getElementsByClassName("iLikeThis")[0]
        .classList.remove("iLikeThis-active");
    }
  };

  const updateLikedImages = (image, liked) => {
    let newImagesArray = reviewImage.map((img) => {
      if (img.id === image.id) {
        return {
          id: img.id,
          like: liked,
        };
      } else {
        return img;
      }
    });
    setReviewImage(newImagesArray);
    hearts(image.id, liked);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="album-title">{album.title}</h1>

      <div>
        <AlbumImages
          images={images}
          updateLikedImages={updateLikedImages}
          setSelectedImgLightbox={setSelectedImgLightbox}
          key={images.id}
        />
        {selectedImgLightbox && (
          <ImageLightbox
            selectedImgLightbox={selectedImgLightbox}
            setSelectedImgLightbox={setSelectedImgLightbox}
          />
        )}
      </div>

      <h3 className="review-count">
        {likedImage.length} / {images.length}
      </h3>

      <div className="send-review">
        <button
          disabled={disabled}
          className="buttons-allaround"
          onClick={handleReview}
        >
          Send review
        </button>
      </div>

      {error && <p>{error}</p>}
    </>
  );
};

export default Review;
