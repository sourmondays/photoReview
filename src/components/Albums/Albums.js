import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfiq";
import One from "../../assets/1.jpg";

const Album = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("albums")
      .where("owner", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setLoading(true);
        const albumsDb = [];

        snapshot.forEach((album) => {
          albumsDb.push({
            id: album.id,
            ...album.data(),
          });
        });
        setAlbums(albumsDb);
        setLoading(false);
      });
    return unsubscribe;
  }, [currentUser]);

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
