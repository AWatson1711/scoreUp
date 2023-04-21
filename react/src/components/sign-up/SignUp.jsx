import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, updateUser } from "../../redux/reducers/user.slice";
import mc from "./signUp.module.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, firstname, email, number, password } = useSelector(
    (store) => store.user,
  );

  // const [name, setName] = useState(user.name);
  // const [firstname, setFirstName] = useState(user.firstname);
  // const [email, setEmail] = useState(user.email);
  // const [number, setNumber] = useState(user.number);
  // const [password, setPassword] = useState(user.password);

  const handleSignUp = (e) => {
    e.preventDefault();
    const redirect = () => {
      navigate("/");
    };

    dispatch(signUp(redirect, { name, firstname, email, number, password }));
  };

  const handleUpdateUser = (key, value) => {
    dispatch(updateUser({ key, value }));
  };

  return (
    <div className={`${mc.container}`}>
      <h2 className={`tac ${mc.title}`}>Score Up</h2>

      <form onSubmit={handleSignUp}>
        <h3 className={mc.subTitle}>Sign up</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => handleUpdateUser("name", e.target.value)}
          placeholder="Nom*"
        />

        <input
          type="text"
          value={firstname}
          onChange={(e) => handleUpdateUser("firstname", e.target.value)}
          placeholder="Prénom*"
        />

        <input
          type="email"
          value={email}
          placeholder="Adresse e-mail*"
          onChange={(e) => handleUpdateUser("email", e.target.value)}
        />

        <input
          type="text"
          value={number}
          placeholder="Numéro de téléphone"
          onChange={(e) => handleUpdateUser("number", e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Mot de passe*"
          onChange={(e) => handleUpdateUser("password", e.target.value)}
        />
        <button type="submit" className={mc.btnSignUp}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
