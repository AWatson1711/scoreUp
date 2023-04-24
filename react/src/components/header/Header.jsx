import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "../nav/Nav";
import mc from "./header.module.scss";
import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={mc.logo}>
          <NavLink to="/">
            <img src={logo} alt="Logo scoreUp" />
          </NavLink>
        </div>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
