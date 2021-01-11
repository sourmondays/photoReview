import React from "react";
import useImages from "../hooks/useImages";

const DisplayImages = () => {
  const { images } = useImages();

  return (
    <>
      <div className="img-grid mt-5">
        {images &&
          images.map((image) => (
            <div className="img-wrap" key={image.id}>
              <img src={image.url} alt="Uploaded" />
            </div>
          ))}
      </div>
      {/* <li className="nav-item">
        <a className="button-navbar" to="/signup">
          Copy url
        </a>
      </li> */}
    </>
  );
};

export default DisplayImages;
