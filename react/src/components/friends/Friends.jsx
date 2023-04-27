import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createFriend, getFriends } from "../../redux/reducers/friends.slice";
import { getItem } from "../../utils/storage.utils";
import avatar from "../../assets/img/avatar.jpeg";
import mc from "./friends.module.scss";

const Friends = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((store) => store.friends);
  const token = getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleEditGame = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    dispatch(getFriends(token));
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createFriend({ name, email }, token));
    await dispatch(getFriends(token));
    setName("");
    setEmail("");
    setShowModal(false);
  };

  return (
    <div>
      {friends.length === 0 && (
        <div>
          <h2>No Friends found</h2>
          <button className={mc.addBtn} onClick={handleEditGame}>
            Ajouter un ami
          </button>
        </div>
      )}
      {Array.isArray(friends) &&
        friends.map((friend) => (
          <NavLink to={`/friends/${friend.id}`} key={friend.id}>
            <article className={mc.friendContainer}>
              <div>
                <img
                  src={avatar}
                  alt="avatar de l'ami"
                  className={mc.profileAvatar}
                />
              </div>
              <div className={mc.friendInfos}>
                <h3>{friend.name}</h3>
                <p>{friend.email}</p>
              </div>
            </article>
          </NavLink>
        ))}
      <button className={mc.addBtn} onClick={handleEditGame}>
        Ajouter un ami
      </button>
      {showModal && (
        <div className={mc.modal}>
          <div className={mc.modalContent}>
            <h2>Ajouter un ami</h2>
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

              <fieldset>
                <legend>Email</legend>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </fieldset>

              <input type="submit" />
              <button
                className={mc.cancelButton}
                type="button"
                onClick={handleCloseModal}
              >
                X
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
