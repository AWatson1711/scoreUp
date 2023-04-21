import React from "react";
import { useNavigate } from "react-router-dom";

import mc from "./game.module.scss";
const GameCard = (props) => {
  const { game } = props;
  const navigate = useNavigate();

  const handleNavigateToGame = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div>
      <article className={mc.gameCard} onClick={handleNavigateToGame}>
        <img src={game.image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>{game.scoreCount} games saved</p>
      </article>
    </div>
  );
};

export default GameCard;
