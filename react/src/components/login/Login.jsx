import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, updateUser } from "../../redux/reducers/user.slice";
import mc from "./login.module.scss";

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
      <h2 className={`tac ${mc.title}`}>Score Up</h2>

      <form onSubmit={handleSignIn}>
        <h3 className={mc.subTitle}>Login</h3>

        <input
          type="email"
          value={email}
          placeholder="Adresse e-mail*"
          onChange={(e) => handleUpdateUser("email", e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Mot de passe*"
          onChange={(e) => handleUpdateUser("password", e.target.value)}
        />
        <button type="submit" className={mc.btnSignIn}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
