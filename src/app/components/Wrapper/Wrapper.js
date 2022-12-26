import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../Authentication/LoginForm";
import Home from "../Home/Home";

function Wrapper() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  if (authenticated == false) {
    return <LoginForm />;
  } else {
    return <Home />;
  }
}

export default Wrapper;
