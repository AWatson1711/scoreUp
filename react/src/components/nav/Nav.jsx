import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Buttons from "../buttons/Buttons";
import mc from "./nav.module.scss";
import { getItem } from "../../utils/storage.utils";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const [navHide, setNavHide] = useState(false);
  const navigate = useNavigate();
const userId = getItem("userId");

const handleClick = () => {
  setIsActive(!isActive);
  setNavHide(!navHide);
};

const isLogged = !!getItem("token");

const logOut = () => {
  localStorage.removeItem("token");

  navigate("/");
};

const [isLight, setIsLight] = useState(false);

const handleThemeChange = () => {
  setIsLight(!isLight);
  const body = document.querySelector("body");
  if (body) {
    body.classList.toggle("light");
  }
};

return (
  <nav>
    {isLogged ? (
      <div>
        <button
          onClick={handleClick}
          className={`${mc.burger} ${isActive ? mc.burgerClicked : !isActive}`}
        >
          <span></span>
        </button>
        <nav
          className={`${!navHide ? mc.navHide : navHide} ${mc.navConnected}`}
        >
          <ul>
            <li>
              <ul>
                <li>
                  <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                  <NavLink to={`/profile/${userId}`}>Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/friends">Amis</NavLink>
                </li>
                <li>
                  <NavLink to="/games">Jeux</NavLink>
                </li>
                <li>
                  <button onClick={logOut} className={mc.disconnect}>
                    Deconnexion
                  </button>
                </li>
                <li>
                  <button onClick={handleThemeChange} className={mc.btnTheme}>
                    {isLight ? "Dark" : "Light"}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div
          onClick={handleClick}
          className={`${mc.overlay} ${isActive ? mc.show : !isActive}`}
        ></div>
      </div>
    ) : (
      <div className={mc.btnContainer}>
        <Buttons />
        <button
          onClick={handleThemeChange}
          className={`${mc.btnTheme} ${mc.disconnect}`}
        >
          {isLight ? "Dark" : "Light"}
        </button>
      </div>
    )}
  </nav>
);
};

export default Nav;
