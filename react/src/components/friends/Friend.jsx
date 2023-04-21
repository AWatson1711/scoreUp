import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneFriend } from "../../redux/reducers/friends.slice";
import { getItem } from "../../utils/storage.utils";
import mc from "./friends.module.scss";

const Friend = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = getItem("token");

  const { loading, friends } = useSelector((store) => store.friends);

  useEffect(() => {
    dispatch(getOneFriend(id, token));
  }, [dispatch, id]);

  const friend = friends.find((f) => f.id == id);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {friend && (
        <div>
          <img src="" alt="une photo du de l'ami" />
          <h1>{friend.name}</h1>
          <h4>{friend.email}</h4>

          {/* Afficher les autres détails du jeu ici */}
        </div>
      )}
    </div>
  );
};

export default Friend;
