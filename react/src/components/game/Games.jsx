import React from "react";
import GameCard from "./GameCard";
import mc from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../../redux/reducers/game.slice";
import { useEffect } from "react";
import { getItem } from "../../utils/storage.utils";
import AddGame from "./AddGame";

const Games = () => {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector((store) => store.games);
  const token = getItem("token");

  useEffect(() => {
    dispatch(getGame(token));
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (games.length === 0) {
    return (
      <div>
        <h2>No games found</h2>
        <AddGame />
      </div>
    );
  }
  return (
    <article className={mc.gameListContainer}>
      <h2>My Games</h2>
      <div className={mc.gameList}>
        {games.map((game) => (
          <div>
            <GameCard key={game.id} game={game} />
          </div>
        ))}
      </div>

      <AddGame />
    </article>
  );
};

export default Games;
