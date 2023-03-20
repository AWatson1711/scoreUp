import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import Home from "../home/Home";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
