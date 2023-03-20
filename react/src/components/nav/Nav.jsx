import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Buttons from "../buttons/Buttons";
import mc from "./nav.module.scss";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const userConnected = () => {
    return true;
  };

  const addClass = () => {
    setIsActive(!isActive);
  };
  return (
    <nav>
      <ul>
        {userConnected ? (
          <li>
            <button
              onClick={addClass}
              className={` ${mc.burger} ${isActive ? mc.active : !isActive} `}
            >
              <span></span>
            </button>
            <ul className={mc.menu}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/">Profil</NavLink>
              </li>
              <li>
                <NavLink to="/">Friends</NavLink>
              </li>
              <li>
                <NavLink to="/">Games</NavLink>
              </li>
            </ul>
          </li>
        ) : (
          <Buttons />
        )}
      </ul>
    </nav>
  );
};

export default Nav;
