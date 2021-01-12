import React from "react";
import AlbumImages from "./AlbumImages";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";
import ImageDropZone from "../Upload/ImageDropZone";

const Album = ({ albums }) => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);

  return (
    <div>
      <h1>
        Images in a spec album. <code>{albumId}</code>
      </h1>

      <ImageDropZone albumId={albumId} />
      <AlbumImages images={images} />
    </div>
  );
};

export default Album;
