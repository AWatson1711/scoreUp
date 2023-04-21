import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createFriend,
  getFriends,
  updateFriends,
} from "../../redux/reducers/friends.slice";
import { getItem } from "../../utils/storage.utils";

const Friends = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((store) => store.friends);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const token = getItem("token");

  useEffect(() => {
    dispatch(getFriends(token));
  }, []);

  // const handleUpdateFriend = (key, value) => {
  //   dispatch(updateFriends({ key, value }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFriend({ name, email }, token)).then(() => {
      dispatch(getFriends(token));
      setName("");
      setEmail("");
    });
  };
  return (
    <div>
      {friends.map((friend) => {
        return (
          <NavLink to={`/friends/${friend.id}`}>
            <article key={friend.id}>
              <h3>{friend.name}</h3>
              <p>{friend.email}</p>
            </article>
          </NavLink>
        );
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="game"
          id="game"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Friends;
