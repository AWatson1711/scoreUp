import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGamePlayed } from "../../redux/reducers/gamePlayed.slice";
import { getItem } from "../../utils/storage.utils";

import mc from "./game.module.scss";
const GameCard = (props) => {
  const { game } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gamesPlayed } = useSelector((store) => store.gamesPlayed);
  const token = getItem("token");

  const gamePlayed = gamesPlayed.filter((gp) => gp.game_id === game.id);
  const gamePlayedCount = !!gamePlayed ? gamePlayed : 0;

  useEffect(() => {
    dispatch(getGamePlayed(token));
  }, []);
  const handleNavigateToGame = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div>
      <article className={mc.gameCard} onClick={handleNavigateToGame}>
        <img src={game.image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>{gamePlayedCount.length} parties sauvegarder</p>
      </article>
    </div>
  );
};

export default GameCard;
