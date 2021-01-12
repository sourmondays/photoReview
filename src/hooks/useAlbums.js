import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfiq";
import { useAuth } from "../contexts/AuthContext";

const useAlbums = () => {
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
  return { albums, loading };
};

export default useAlbums;
