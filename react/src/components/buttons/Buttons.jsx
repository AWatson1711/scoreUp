import React from "react";
import mc from "./buttons.module.scss";

const Buttons = () => {
  return (
    <div>
      <button className={mc.login}>Log In</button>
      <button className={mc.signUp}>Sign Up</button>
    </div>
  );
};

export default Buttons;
