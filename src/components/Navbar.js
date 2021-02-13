import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { logout, currentUser } = useAuth();

  let history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  return (
    <>
      <div className="navbar-container">
        <div className="container">
          <nav>
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
                  <Link to="/albums">Albums</Link>
                </li>

                <li className="nav-item">
                  <Link to="/reviewed">Reviewed</Link>
                </li>

                {currentUser ? (
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="button-navbar"
                      onClick={handleLogout}
                    >
                      Log out
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="button-navbar" to="/albums">
                      Login
                    </Link>
                  </li>
                )}

                {currentUser ? (
                  <p></p>
                ) : (
                  <li className="nav-item">
                    <Link to="/signup" className="button-navbar">
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
