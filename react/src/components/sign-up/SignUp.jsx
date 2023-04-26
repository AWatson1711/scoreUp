import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp, updateUser } from "../../redux/reducers/user.slice";
import mc from "./signUp.module.scss";
import manette from "../../assets/img/manette.png";

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
      <div className={mc.formContainer}>
        <form onSubmit={handleSignUp}>
          <h2 className={`tac ${mc.title}`}>Créer un compte</h2>
          <h5 className={mc.subTitle}>C'est parti !</h5>
          <fieldset>
            <legend>Name</legend>
            <input
              type="text"
              value={name}
              onChange={(e) => handleUpdateUser("name", e.target.value)}
              placeholder="Nom*"
            />
          </fieldset>

          <fieldset>
            <legend>Prénom</legend>
            <input
              type="text"
              value={firstname}
              onChange={(e) => handleUpdateUser("firstname", e.target.value)}
              placeholder="Prénom*"
            />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              value={email}
              placeholder="Adresse e-mail*"
              onChange={(e) => handleUpdateUser("email", e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Numéro</legend>
            <input
              type="text"
              value={number}
              placeholder="Numéro de téléphone"
              onChange={(e) => handleUpdateUser("number", e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Mot de passe</legend>
            <input
              type="password"
              value={password}
              placeholder="Mot de passe*"
              onChange={(e) => handleUpdateUser("password", e.target.value)}
            />
          </fieldset>
          <div>
            <button type="submit" className={mc.btnSignUp}>
              Sign up
            </button>
            <NavLink to="login">
              Vous avez déjà un compte ? <span>Log in</span>{" "}
            </NavLink>
          </div>
        </form>
        <div className={mc.imageContainer}>
          <img src={manette} alt="Image de manette" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
