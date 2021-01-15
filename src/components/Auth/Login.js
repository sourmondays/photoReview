import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/albums");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <img src={One} alt="" />
          <div className="container-signup-login">
            <h1 className="welcome-login-signup">Welcome to Photo Review</h1>
            <p className="welcome-text">
              Create photo albums and share with client
            </p>
            <label htmlFor="email">
              <p className="header-desc">Email</p>
            </label>
            <input type="text" name="email" ref={emailRef} required />

            <label htmlFor="password">
              <p className="header-desc">Password</p>
            </label>

            <input type="password" name="password" ref={passwordRef} required />

            {error && <p className="error">{error}</p>}

            <button disabled={loading} className="signup" type="submit">
              Login
            </button>

            <div className="signup-login">
              Dosn't have an account? <Link to="/signup">Sign up</Link>
            </div>

            <div className="forgot-login">
              <Link to="/resetpassword">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
