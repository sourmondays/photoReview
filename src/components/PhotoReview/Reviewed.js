import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useReviewed from "../../hooks/useReviewed";

const Reviewed = () => {
  const { currentUser } = useAuth();
  const { albums, loading } = useReviewed(currentUser.uid);

  return (
    <div>
      <h1 className="reviewed-header">Reviewed albums</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="grid-images">
          {albums.map((reviewed) => (
            <div key={reviewed.id}>
              <Link to={`reviewed/${reviewed.id}`}>
                <img src={reviewed.cover} alt="Uploaded" />
              </Link>
              <label className="container-checkbox-albums">
                <p className="album-title-header">{reviewed.title}</p>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviewed;
