import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfiq";

const useImages = (albumId) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("images")
      .where("album", "==", db.collection("albums").doc(albumId))
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const imgs = [];

        snapshot.forEach((doc) => {
          imgs.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setImages(imgs);
      });

    return unsubscribe;
  }, [albumId]);

  return { images };
};

export default useImages;
