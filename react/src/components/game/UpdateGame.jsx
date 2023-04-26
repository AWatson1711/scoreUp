import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyGame } from "../../redux/reducers/game.slice";

const UpdateGame = (props) => {
  const dispatch = useDispatch();
  const { gameId, currentName } = props;

  const [name, setName] = useState(currentName);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(modifyGame({ gameId, name }));
      // Handle success case
    } catch (err) {
      // Handle error case
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={name} onChange={handleNameChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default UpdateGame;
