import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";
import useAlbums from "../../hooks/useAlbums";

const ReviewedAlbums = () => {
  const { currentUser } = useAuth();
  const { albums, loading } = useAlbums(currentUser.uid);
  return (
    <>
      <div>
        <h1 className="album-header">Reviewed albums</h1>
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
export default ReviewedAlbums;
