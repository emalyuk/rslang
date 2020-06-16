import React from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  let history = useHistory();

  return (
    <div className="navbar">
      <span onClick={() => history.push("/")}>Home</span>
      <span onClick={() => history.push("/login")}>Login</span>
      <span onClick={() => history.push("/registration")}>Registration</span>
      <span onClick={() => history.push("/game")}>Game</span>
    </div>
  );
};

export default Navbar;
