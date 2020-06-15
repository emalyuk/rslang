import React from "react";
import "./Navbar.scss";

export const Navbar = () => (
  <div className="navbar">
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/registration">Registration</a>
    <a href="/game">Game</a>
  </div>
);

export default Navbar;
