import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame, getGame } from "../../redux/reducers/game.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./game.module.scss";

const AddGame = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const token = getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createGame(name, token)).then(() => {
      dispatch(getGame(token));
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

  // const handleUpdateGame = (key, value) => {
  //   dispatch(updateGame({ key, value }));
  // };

  return (
    <div>
      <button className={mc.addBtn} onClick={handleEditGame}>
        Ajouter un jeu
      </button>
      {showModal && (
        <div className={mc.modal}>
          <div className={mc.modalContent}>
            <h2>Ajouter un jeu</h2>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Name</legend>
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
    </div>
  );
};

export default AddGame;
