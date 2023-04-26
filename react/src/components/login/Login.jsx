import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, updateUser } from "../../redux/reducers/user.slice";
import mc from "./login.module.scss";
import manette from "../../assets/img/manette.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = useSelector((store) => store.user);

  // const [name, setName] = useState(user.name);
  // const [firstname, setFirstName] = useState(user.firstname);
  // const [email, setEmail] = useState(user.email);
  // const [number, setNumber] = useState(user.number);
  // const [password, setPassword] = useState(user.password);

  const handleSignIn = (e) => {
    e.preventDefault();
    const redirect = () => {
      navigate("/");
    };

    dispatch(signIn(redirect, { email, password }));
  };

  const handleUpdateUser = (key, value) => {
    dispatch(updateUser({ key, value }));
  };

  return (
    <div className={`${mc.container}`}>
      <div className={`container ${mc.formContainer}`}>
        <form onSubmit={handleSignIn}>
          <h2 className={` ${mc.title}`}>Se connecter</h2>
          <h3 className={mc.subTitle}>Bienvenue !</h3>

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
            <legend>Mot de passe</legend>
            <input
              type="password"
              value={password}
              placeholder="Mot de passe*"
              onChange={(e) => handleUpdateUser("password", e.target.value)}
            />
          </fieldset>

          <button type="submit" className={mc.btnSignIn}>
            Log in
          </button>
        </form>
        <div className={mc.imageContainer}>
          <img src={manette} alt="Image de manette" />
        </div>
      </div>
    </div>
  );
};

export default Login;
