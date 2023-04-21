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

  const handleClick = () => {
    setIsActive(!isActive);
    setNavHide(!navHide);
  };

  const isLogged = !!getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav>
      {isLogged ? (
        <div>
          <button
            onClick={handleClick}
            className={`${mc.burger} ${
              isActive ? mc.burgerClicked : !isActive
            }`}
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
                    <NavLink to={`/profile/:id`}>Profile</NavLink>
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
        <Buttons />
      )}
    </nav>
  );
};

export default Nav;
