import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGame } from "../../redux/reducers/game.slice";
import {
  createGamePlayed,
  getGamePlayed,
} from "../../redux/reducers/gamePlayed.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./gamesPlayed.module.scss";

const AddGamePlayed = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const token = getItem("token");

  const { games, loading, error } = useSelector((store) => store.games);

  useEffect(() => {
    dispatch(getGame(token));
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createGamePlayed(name, token)).then(() => {
      dispatch(getGamePlayed(token));
      setName("");
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleEditGame = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button className={mc.addBtn} onClick={handleEditGame}>
        Ajouter une partie
      </button>
      {showModal && (
        <div className={mc.modal}>
          <div className={mc.modalContent}>
            <h2>Ajouter un partie</h2>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Nom de partie</legend>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Commentaire</legend>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  value={comment}
                  placeholder="Commentaire"
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset>
                <legend>Jeu</legend>
                <select name="games" id="game-select">
                  <option value="">--Please choose an option--</option>
                  {games.map((game) => {
                    return <option value={game.name}>{game.name}</option>;
                  })}
                </select>
              </fieldset>

              <input type="submit" />
              <button
                className={mc.cancelButton}
                type="button"
                onClick={handleCloseModal}
              ></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddGamePlayed;
