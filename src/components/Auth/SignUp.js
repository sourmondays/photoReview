import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import One from "../../assets/1.jpg";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfrimRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfrimRef.current.value) {
      return setError("The password dosn't match");
    }

    setError(null);

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
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
            <h2 className="header-signup">Sign up</h2>
            <label htmlFor="email">
              <p className="header-desc">Email</p>
            </label>
            <input type="text" name="email" ref={emailRef} required />

            <label htmlFor="password">
              <p className="header-desc">Password</p>
            </label>

            <input type="password" name="password" ref={passwordRef} required />

            <label htmlFor="passwordConfrim">
              <p className="header-desc">Confirm password</p>
            </label>

            <input
              type="password"
              name="passwordConfim"
              ref={passwordConfrimRef}
              required
            />

            {error && <p className="error">{error}</p>}

            <button disabled={loading} className="buttons-long" type="submit">
              <p>Sign up</p>
            </button>

            <div className="signup-login">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
