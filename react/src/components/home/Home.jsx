import React, { useEffect, useState } from "react";
import mc from "./home.module.scss";
import cod from "../../assets/img/cod_logo.jpg";
import fortnite from "../../assets/img/fortnite_logo.png";
import lol from "../../assets/img/lol_logo.jpg";
import overwatch from "../../assets/img/overwatch.jpg";
import tft from "../../assets/img/tft_logo.jpg";
import valorant from "../../assets/img/valorant_logo.png";
import Buttons from "../buttons/Buttons";
import { getItem } from "../../utils/storage.utils";
import { useDispatch, useSelector } from "react-redux";
import { getGamePlayed } from "../../redux/reducers/gamePlayed.slice";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const token = getItem("token");
  const isLogged = !!token;

  const [date, setDate] = useState("");
  useEffect(() => {
    const now = new Date().toLocaleDateString("FR-fr");
    setDate(now);
  }, []);

  const { gamesPlayed, loading, stat } = useSelector(
    (store) => store.gamesPlayed,
  );
  console.log(gamesPlayed);

  useEffect(() => {
    dispatch(getGamePlayed(token));
  }, [token]);

  return (
    <main className="container">
      {isLogged ? (
        <div className={mc.w100}>
          <h2 className={mc.subTitle}>Historiques des parties</h2>
          <div className={mc.tableContainer}>
            {gamesPlayed.map((gamePlayed) => {
              return (
                <NavLink to={`/gamesPlayed/${gamePlayed.id}`}>
                  <table className={mc.table}>
                    <tbody>
                      <tr>
                        <td>
                          <img src="" alt="liste de jeu" />
                        </td>
                        <td>{date}</td>
                        <td>{gamePlayed.game_name}</td>
                        <td>Rick, Eric, Sil</td>
                      </tr>
                    </tbody>
                  </table>
                </NavLink>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div>
            {" "}
            <h2 className={mc.title}>
              <span className={mc.redText}>ScoreUp</span> Un outil unique pour{" "}
              <span className={mc.redText}>centraliser</span> vos{" "}
              <span className={mc.redText}>parties</span>
            </h2>
            <h4 className={mc.subTitle}>
              Enregistrer vos meilleurs score sur votre jeu préférer avec vos
              amis et montrez qui est le meilleurs gamer !
            </h4>
          </div>
          <div>
            <div className={mc.imageContainer}>
              <div className={mc.boxImage}>
                <img src={cod} alt="Logo Call Of Duty" />
              </div>
              <div className={mc.boxImage}>
                <img src={lol} alt="Logo League of Legends" />
              </div>
              <div className={mc.boxImage}>
                <img src={valorant} alt="Logo valorant" />
              </div>
              <div className={mc.boxImage}>
                <img src={fortnite} alt="Logo fortnite" />
              </div>
              <div className={mc.boxImage}>
                <img src={tft} alt="Logo tft" />
              </div>
              <div className={mc.boxImage}>
                <img src={overwatch} alt="Logo overwatch" />
              </div>
            </div>
            <div className={mc.btnContainer}>
              <Buttons btnHome={mc.btnHome} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
