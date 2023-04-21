import React from "react";
import { NavLink } from "react-router-dom";
import mc from "./buttons.module.scss";

const Buttons = (props) => {
  const { btnHome } = props;
  return (
    <div>
      <NavLink to="/login" className={`${mc.login} ${btnHome}`}>
        Log In
      </NavLink>
      <NavLink to="/sign-up" className={`${mc.signUp} ${btnHome}`}>
        Sign Up
      </NavLink>
    </div>
  );
};

export default Buttons;
