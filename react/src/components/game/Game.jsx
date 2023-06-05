import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import overwatch from "../../assets/img/overwatch.jpg";
import {
  deleteGame,
  getOneGame,
  modifyGame,
  updateGame,
} from "../../redux/reducers/game.slice";
import {
  getGamePlayed,
  startLoading,
  stopLoading,
} from "../../redux/reducers/gamePlayed.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./game.module.scss";
import tft from "../../assets/img/tft_logo.jpg";

const Game = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getItem("token");
  const { loading, game, name } = useSelector((store) => store.games);
  const navigate = useNavigate();

  const { gamesPlayed } = useSelector((store) => store.gamesPlayed);
  const gamePlayed = gamesPlayed.filter((gp) => gp.game_id === game.id);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getGamePlayed(token));
  }, []);

  useEffect(() => {
    dispatch(getOneGame(id, token));
  }, [dispatch, id]);

  const handleNameChange = (event) => {
    dispatch(updateGame({ key: "name", value: event.target.value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(
      modifyGame({ gameId: game.id, name: name === "" ? game.name : name }),
    ).then(() => {
      dispatch(getOneGame(id, token));
    });
    setShowModal(false);
  };

  const handleDeleteGame = () => {
    dispatch(deleteGame(game.id, token));
    navigate("/games");
  };

  const handleEditGame = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {game && (
        <div className={mc.gameContainer}>
          <img src={overwatch} alt="une photo du jeu" />
          <h2 className={mc.title}>{game.name}</h2>
          {gamePlayed.map((gp) => {
            return (
              <table key={gp.id} className={mc.table}>
                <tbody>
                  <tr>
                    <td>
                      <img src={tft} alt="liste de jeu" />
                    </td>
                    <td>25/04/2023</td>
                    <td>{gp.game_name}</td>
                    <td>Joueur</td>
                  </tr>
                </tbody>
              </table>
            );
          })}
          <div className={mc.btnContainer}>
            <button className={mc.editButton} onClick={handleEditGame}>
              Edit
            </button>
            <button onClick={handleDeleteGame}>Delete</button>
            {showModal && (
              <div className={mc.modal}>
                <div className={mc.modalContent}>
                  <h2>Edit Game</h2>
                  <form onSubmit={handleSave}>
                    <fieldset>
                      <legend>Name</legend>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleNameChange}
                        defaultValue={game.name}
                      />
                    </fieldset>

                    <button className={mc.saveButton} type="submit">
                      Save
                    </button>
                    <button
                      className={mc.cancelButton}
                      type="button"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Afficher les autres détails du jeu ici */}
        </div>
      )}
    </div>
  );
};

export default Game;
