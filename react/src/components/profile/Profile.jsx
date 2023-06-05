import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getOneUser,
  modifyUser,
  startLoading,
  updateUser,
} from "../../redux/reducers/user.slice";
import { getItem } from "../../utils/storage.utils";
import avatar from "../../assets/img/avatar.jpeg";
import mc from "./profile.module.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, name, firstname, email, number } = useSelector(
    (store) => store.user,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getItem("token");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getOneUser(user.id, token));
  }, []);

  const handleEditGame = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (key, value) => {
    dispatch(updateUser({ key, value }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    dispatch(
      modifyUser({
        userId: user.id,
        name: name === "" ? user.name : name,
        firstname: firstname === "" ? user.firstname : firstname,
        email: email === "" ? user.email : email,
        number: number === "" ? user.number : number,
      }),
    ).then(() => {
      dispatch(getOneUser(user.id, token));
    });
    setShowModal(false);
  };
  const handleDeleteUser = () => {
    const confirm = window.confirm(
      "Voulez vous vraiment supprimer votre compte ?",
    );
    if (confirm === true) {
      dispatch(deleteUser(user.id, token));
      localStorage.removeItem("token");
      navigate("/sign-up");
    }
  };

  return (
    <div className={mc.profileContainer}>
      <div className={mc.profileHeader}>
        <img
          src={avatar}
          alt={`${user.name}'s avatar`}
          className={mc.profileAvatar}
        />
        <h1 className={mc.profileName}>
          {user.name} {user.firstname}
        </h1>
      </div>
      <div className={mc.infoContainer}>
        <h5 className={mc.profileEmail}>Email: {user.email}</h5>
        <h5 className={mc.profileEmail}>Numéro: {user.number}</h5>
      </div>
      <div className={mc.btnContainer}>
        <button className={mc.editButton} onClick={handleEditGame}>
          Edit
        </button>
        <button onClick={handleDeleteUser}>Supprimer le compte</button>
      </div>

      {showModal && (
        <div className={mc.modal}>
          <div className={mc.modalContent}>
            <h2>Edit User</h2>
            <form onSubmit={handleSave}>
              <fieldset>
                <legend>Nom</legend>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                  defaultValue={user.name}
                />
              </fieldset>
              <fieldset>
                <legend>Prénom</legend>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  onChange={(e) => handleChange("firstname", e.target.value)}
                  defaultValue={user.firstname}
                />
              </fieldset>
              <fieldset>
                <legend>Email</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  defaultValue={user.email}
                />
              </fieldset>
              <fieldset>
                <legend>Numéro</legend>
                <input
                  type="number"
                  id="number"
                  name="number"
                  onChange={(e) => handleChange("number", e.target.value)}
                  defaultValue={user.number}
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
                X
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
