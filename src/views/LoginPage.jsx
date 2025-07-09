import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState, useRef } from "react";
import { auth } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice.js";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
 
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [errorreply, seterrorreply] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));

      // ...
    } else {
      dispatch(setUser(null));
    }

    if(isLoading){

      setIsLoading(false);
    }
  });

  const signuphandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // Your signup logic here
    seterrorreply(false);
    setErrorMessage(" ");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorreply(true);
        setErrorMessage(errorMessage);

        // ..
      });
  };

  const loginhandler = (e) => {
    e.preventDefault();
    seterrorreply(false);
    setErrorMessage(" ");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate("/book");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorreply(true);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                ref={emailRef}
                type="text"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {loginType == "login" ? (
              <button
                type="button"
                className="active btn btn-block"
                onClick={loginhandler}
              >
                Login
              </button>
            ) : (
              <button
                type="button"
                className="active btn btn-block"
                onClick={signuphandler}
              >
                Sign Up
              </button>
            )}
            <p className="forgot-password">Forgot Password?</p>
          </form>

          {errorreply ? <p style={{ color: "red" }}>{errorMessage}</p> : ""}
        </section>
      </div>
    </>
  );
}

export default LoginPage;
