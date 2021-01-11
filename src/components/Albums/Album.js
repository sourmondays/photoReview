import React from "react";
import AlbumImages from "./AlbumImages";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";

const Album = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);

  return (
    <div>
      <p>
        Images in a spec album. <code>{albumId}</code>
      </p>
      <AlbumImages images={images} />
    </div>
  );
};

export default Album;
