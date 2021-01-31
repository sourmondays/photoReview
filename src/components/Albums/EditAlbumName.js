import React, { useState, useRef } from "react";
import { db } from "../../firebase/firebaseConfiq";
import { useHistory, useParams } from "react-router-dom";
import useAlbum from "../../hooks/useAlbum";

const EditAlbumName = () => {
  const editRef = useRef();
  const [error, setError] = useState(false);
  const history = useHistory();
  const { albumId } = useParams();
  const { album, loading } = useAlbum(albumId);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (editRef.current.value.length < 4) {
      return;
    }

    if (editRef.current.value.length > 50) {
      return;
    }

    setError(false);
    try {
      await db.collection("albums").doc(albumId).update({
        title: editRef.current.value,
      });

      history.push(`/albums`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-container">
        <div className="container-signup-login">
          <label htmlFor="album">
            <p className="header-desc">Edit album name</p>
          </label>
          <input
            type="text"
            name="album"
            ref={editRef}
            defaultValue={album.title}
            required
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading} className="buttons-long" type="submit">
            Edit album
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditAlbumName;
