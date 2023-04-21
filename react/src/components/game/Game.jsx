import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../redux/reducers/game.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./game.module.scss";

const Game = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getItem("token");

  const { loading, games } = useSelector((store) => store.games);

  useEffect(() => {
    dispatch(getOneGame(id, token));
  }, [dispatch, id]);

  const game = games.find((g) => g.id == id);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {game && (
        <div>
          <img src="" alt="une photo du jeu" />
          <h1>{game.name}</h1>
          <h4>Score: </h4>

          {/* Afficher les autres détails du jeu ici */}
        </div>
      )}
    </div>
  );
};

export default Game;
