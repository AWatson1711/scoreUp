import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneGamePlayed } from "../../redux/reducers/gamePlayed.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./gamesPlayed.module.scss";

const GamePlayed = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getItem("token");

  const { loading, gamesPlayed } = useSelector((store) => store.gamesPlayed);

  useEffect(() => {
    dispatch(getOneGamePlayed(id, token));
  }, [dispatch, id]);

  const gamePlayed = gamesPlayed.filter((gp) => gp.id == id);
  console.log(gamePlayed);
  const date = Date.now;
  return (
    <div>
      {loading && <p>Loading...</p>}
      {gamePlayed && (
        <div>
          <img src="" alt="une photo de la partie jouer" />
          <h1>{gamePlayed.game_name}</h1>
          <h4>{gamePlayed.comment}</h4>
          <p>{date}</p>

          {/* Afficher les autres détails du jeu ici */}
        </div>
      )}
    </div>
  );
};

export default GamePlayed;
