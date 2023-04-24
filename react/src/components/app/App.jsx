import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import Home from "../home/Home";
import SignUp from "../sign-up/SignUp";
import Login from "../login/Login";
import Games from "../game/Games";
import Error404 from "../error-pages/Error404";
import Friends from "../friends/Friends";
import Game from "../game/Game";
import Profile from "../profile/Profile";
import Friend from "../friends/Friend";
import GamePlayed from "../gamePlayed/GamePlayed";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/gamesPlayed/:id" element={<GamePlayed />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/:id" element={<Friend />} />
        <Route path="/error404" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
