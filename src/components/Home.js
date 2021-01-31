import React from "react";
import One from "../assets/1.jpg";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <img src={One} alt="Background colors" />
        <div className="centered-home">
          <h1 className="home-create">Create albums</h1>
          <h2 className="home-share">And share your photos</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
