import React, { useEffect } from "react";
import mc from "./home.module.scss";
import game from "../../assets/img/gaming.svg";
import Buttons from "../buttons/Buttons";
import { getItem } from "../../utils/storage.utils";
import { useDispatch, useSelector } from "react-redux";
import { getGamePlayed } from "../../redux/reducers/gamePlayed.slice";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const token = getItem("token");

  const isLogged = !!token;

  const { gamesPlayed, loading } = useSelector((store) => store.gamesPlayed);
  console.log(gamesPlayed);

  useEffect(() => {
    dispatch(getGamePlayed(token));
  }, [token]);

  return (
    <main className="container tac">
      <h1 className={mc.title}>Bienvenue sur ScoreUp !</h1>
      {isLogged ? (
        <div>
          <h2>Historiques des parties</h2>
          <div className="flex">
            {gamesPlayed.map((gamePlayed) => {
              return (
                <NavLink to={`/gamesPlayed/${gamePlayed.id}`}>
                  <article
                    key={gamePlayed.id}
                    className={`${mc.gamePlayedCard}`}
                  >
                    <img src="" alt="" />
                    <h4>{gamePlayed.game_name}</h4>
                    <p>{gamePlayed.comment}</p>
                    <p>{gamePlayed.friend_id}</p>
                  </article>
                </NavLink>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <img
              src={game}
              alt="image de personnes qui jouent à un jeu vidéo"
            />
          </div>
          <h3 className={mc.subTitle}>
            Enregistrer vos meilleurs score sur votre jeu préférer avec vos amis
            et montrez qui est le meilleurs gamer !
          </h3>
          <Buttons btnHome={mc.btnHome} />
        </div>
      )}
    </main>
  );
};

export default Home;
