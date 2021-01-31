import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { logout, currentUser } = useAuth();
  let history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/");
    window.location.reload();
  };

  const refreshPageAlbums = () => {
    history.push("/albums");
    window.location.reload();
  };

  const refreshPageReviewed = () => {
    history.push("/reviewed");
    window.location.reload();
  };

  const refreshPageLogin = () => {
    history.push("/login");
    window.location.reload();
  };

  const refreshPageSignup = () => {
    history.push("/signup");
    window.location.reload();
  };
  return (
    <>
      <div className="navbar-container">
        <div className="container">
          <nav>
            <input type="checkbox" id="nav" className="hidden" />
            <label htmlFor="nav" className="nav-btn">
              <i></i>
              <i></i>
            </label>
            <div className="logo">
              <Link to="/">Photo Review</Link>
            </div>
            <div className="nav-wrapper">
              <ul>
                <li className="nav-item">
                  <Link onClick={refreshPageAlbums}>Albums</Link>
                </li>

                <li className="nav-item">
                  <Link onClick={refreshPageReviewed}>Reviewed</Link>
                </li>

                {currentUser ? (
                  <li className="nav-item">
                    <Link className="button-navbar" onClick={handleLogout}>
                      Log out
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="button-navbar"
                      onClick={refreshPageLogin}
                      to="/albums"
                    >
                      Login
                    </Link>
                  </li>
                )}

                {currentUser ? (
                  <p></p>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="button-navbar"
                      onClick={refreshPageSignup}
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
