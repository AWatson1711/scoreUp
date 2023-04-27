import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFriend,
  getOneFriend,
  modifyFriend,
  startLoading,
  updateFriends,
} from "../../redux/reducers/friends.slice";
import avatar from "../../assets/img/avatar.jpeg";
import { getGamePlayed } from "../../redux/reducers/gamePlayed.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./friends.module.scss";
import tft from "../../assets/img/tft_logo.jpg";

const Friend = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getItem("token");
  const navigate = useNavigate();

  const { loading, friends, name, email } = useSelector(
    (store) => store.friends,
  );

  const { gamesPlayed } = useSelector((store) => store.gamesPlayed);
  const gamePlayed = gamesPlayed.filter((gp) => gp.friend_id === friends.id);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getGamePlayed(token));
  }, []);

  useEffect(() => {
    dispatch(getOneFriend(id, token));
  }, [dispatch, id]);

  const handleEditGame = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (key, value) => {
    dispatch(updateFriends({ key, value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(modifyFriend({ friendId: friends.id, name, email })).then(() => {
      dispatch(getOneFriend(id, token));
    });
    setShowModal(false);
  };

  const handleDeleteFriend = () => {
    dispatch(deleteFriend(friends.id, token));
    navigate("/friends");
  };
  return (
    <div className={`container ${mc.friendBox}`}>
      {loading && <p>Loading...</p>}
      {friends && (
        <div className={mc.friendHeader}>
          <div>
            <img src={avatar} alt={friends.name} className={mc.friendAvatar} />
          </div>
          <div>
            <h2>{friends.name}</h2>
            <h4>{friends.email}</h4>
          </div>
        </div>
      )}
      <div className={mc.btnContainer}>
        <button className={mc.editButton} onClick={handleEditGame}>
          Edit
        </button>
        <button onClick={handleDeleteFriend}>Delete</button>
      </div>
      {showModal && (
        <div className={mc.modal}>
          <div className={mc.modalContent}>
            <h2>Modifier Ami</h2>
            <form onSubmit={handleSave}>
              <fieldset>
                <legend>Name</legend>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                  defaultValue={friends.name}
                />
              </fieldset>
              <fieldset>
                <legend>Email</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  defaultValue={friends.email}
                />
              </fieldset>

              <button className={mc.saveButton} type="submit">
                Save
              </button>
              <button
                className={mc.cancelButton}
                type="button"
                onClick={handleCloseModal}
              ></button>
            </form>
          </div>
        </div>
      )}
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
                <td>{friends.name}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Friend;
