import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../nav/Nav";
import mc from "./header.module.scss";

const Header = () => {
  return (
    <header>
      <div className={mc.container}>
        <h1>
          <NavLink to="/">ScoreUp</NavLink>
        </h1>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
