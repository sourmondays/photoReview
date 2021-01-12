import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";
import useAlbums from "../../hooks/useAlbums";

const Album = () => {
  const { currentUser } = useAuth();
  const { albums, loading } = useAlbums();

  return (
    <>
      <div className="container-user-text">
        <p className="user-text">Welcome {currentUser.email}</p>
      </div>
      <h1>Albums</h1>

      <div>
        <Link to="/albums/create">Create a new album</Link>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="img-grid-albums">
          {albums.map((album) => (
            <div className="img-wrap-albums" key={album.id}>
              <Link to={`album/${album.id}`}>
                <img src={One} alt="Uploaded" />

                <div className="centered">
                  <h1>{album.title}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Album;
