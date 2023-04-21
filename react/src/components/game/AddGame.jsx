import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame, getGame } from "../../redux/reducers/game.slice";
import { getItem } from "../../utils/storage.utils";
import ImageUpload from "../media/uploadImage";

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

  // const handleUpdateGame = (key, value) => {
  //   dispatch(updateGame({ key, value }));
  // };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="game"
        id="game"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default AddGame;
