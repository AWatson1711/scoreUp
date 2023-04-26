import React, { useEffect } from "react";
import GameCard from "./GameCard";
import AddGame from "./AddGame";
import UpdateGame from "./UpdateGame";
import mc from "./game.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../../redux/reducers/game.slice";
import { getItem } from "../../utils/storage.utils";

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

  return (
    <article className={mc.gameListContainer}>
      <h2>My Games</h2>
      {games.length === 0 && (
        <div>
          <h2>No games found</h2>
          <AddGame />
        </div>
      )}
      {games.length > 0 && (
        <div className={mc.gameList}>
          {games.map((game) => (
            <div key={game.id}>
              <GameCard game={game} currentName={game.name} />
              {/* <UpdateGame gameId={game.id} /> */}
            </div>
          ))}
        </div>
      )}
      <AddGame />
    </article>
  );
};

export default Games;
