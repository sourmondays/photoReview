import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";
import useAlbums from "../../hooks/useAlbums";

const Albums = () => {
  const { currentUser } = useAuth();
  const { albums, loading } = useAlbums(currentUser.uid);

  return (
    <>
      <div className="container-user-text">
        <p className="user-text">Welcome {currentUser.email}</p>
      </div>
      <h1 className="album-header">Your albums</h1>

      <div className="center-things">
        <Link className="buttons-allaround" to="/albums/create">
          Create album
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="grid-images">
          {albums.map((album) => (
            <div key={album.id}>
              <Link to={`album/${album.id}`}>
                <img src={One} alt="Uploaded" />
              </Link>
              <label className="container-checkbox-albums">
                <p className="album-title-header">{album.title}</p>
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Albums;
