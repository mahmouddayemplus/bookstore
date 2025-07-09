import { NavLink } from "react-router-dom";
import { selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Header({ pageTitle }) {
  const user = useSelector(selectUser);


  function logouthandler() {
    console.log("logout handler");
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Optionally redirect or update UI here
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Books</button>
        </NavLink>

        <NavLink to="/add-book">
          <button className="btn">Add Book +</button>
        </NavLink>

        <button className="btn transparent" onClick={logouthandler}>
          Logout
        </button>
        <p className="user-email">{user.email}</p>
      </div>
    </>
  );
}

export default Header;
