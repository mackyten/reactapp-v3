import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authenticatorSlice";
import "./LoginForm.css";
import { Register } from "./Register/Register";
import Constants from "../../constants/Constants";
import ButtonLoading from "../Loading/ButtonLoading";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [loginButtonPressed, setLoginButtonPressed] = useState(false);

  const changePage = () => {
    if (currentPage === "register") {
      setCurrentPage("login");
    } else {
      setCurrentPage("register");
    }
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    console.log("Login Button is pressed");
    setLoginButtonPressed(true);

    const url = Constants.API_URL_LOGIN;

    const userCredentials = {
      email: email,
      password: password,
      role: "string",
      firstname: "string",
      surname: "string",
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == null) {
          dispatch(
            login({
              authenticated: data.authenticated,
              token: data.jwt,
              credentials: data,
            })
          );
          console.log("Success:", data);
          setLoginButtonPressed(false);
        } else {
          console.error(data);
          alert(data.title);
          setLoginButtonPressed(false);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        alert(error);
        setLoginButtonPressed(false);
      });
  };

  if (currentPage === "login") {
    return (
      <div className="Form">
        <section>
          <h2>User Login</h2>
        </section>

        <form onSubmit={LoginHandler}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="login">
            {loginButtonPressed ? (
              <div className="loadingbutton">
                <ButtonLoading />
              </div>
            ) : (
              <p>Login</p>
            )}
          </button>
        </form>

        <button type="register" className="register" onClick={changePage}>
          Register
        </button>
      </div>
    );
  } else {
    return <Register onChangePage={changePage} />;
  }
}

export default LoginForm;
