import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db, timestamp } from "../../firebase/firebaseConfiq";
import { useHistory } from "react-router-dom";

const Create = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();

  const handleAlbumName = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 4) {
      return;
    }

    if (title.length > 50) {
      return;
    }

    setError(false);
    setLoading(true);

    const createdAt = timestamp();

    try {
      const docReference = await db.collection("albums").add({
        title,
        createdAt,
        owner: currentUser.uid,
      });
      history.push(`/album/${docReference.id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-container">
        <div className="container-signup-login">
          <label htmlFor="album">
            <p className="header-desc">Album name</p>
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

          {title && title.length > 50 && (
            <p className="error">
              Please enter a title that are max 50 characters long.
            </p>
          )}

          <button disabled={loading} className="buttons-long" type="submit">
            Create album
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
