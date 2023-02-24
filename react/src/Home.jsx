import React from "react";
import Games from "./components/Games";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Users from "./components/Users";
import { useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "toto", pseudo: "b2o", email: "abcd@gmail.com" },
    { id: 2, name: "tata", pseudo: "bgdu33", email: "efgh@gmail.com" },
    { id: 3, name: "jojo", pseudo: "horahora", email: "ijkl@gmail.com" },
  ]);

  const [games, setGames] = useState([
    { id: 1, name: "Call of duty" },
    { id: 2, name: "League of legends" },
  ]);

  const [stats, setStats] = useState([
    { id: 1, kill: 0, death: 10, assist: 1, damage: 2000 },
    { id: 2, kill: 20, death: 9, assist: 0, damage: 4000 },
    { id: 3, kill: 5, death: 2, assist: 20, damage: 10000 },
  ]);

  return (
    <div>
      <Header />
      <main>
        <Users />
        <Games />
        <Stats />
      </main>
    </div>
  );
};

export default Home;
