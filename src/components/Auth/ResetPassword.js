import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);

    setError(null);

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please check your email.");
    } catch (e) {
      setError("Something went wrong, please check your email address.");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <img src={One} alt="" />
          <div className="container-signup-login">
            <h2 className="header-signup">Reset password</h2>
            <label htmlFor="email">
              <p className="header-desc">Email</p>
            </label>
            <input type="text" name="email" ref={emailRef} required />

            {error && <p className="error">{error}</p>}
            {message && <p className="error">{message}</p>}

            <button className="signup" type="submit">
              Reset password
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
