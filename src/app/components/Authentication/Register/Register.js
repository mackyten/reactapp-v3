import "../LoginForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authenticatorSlice";
import Constants from "../../../constants/Constants";
import ButtonLoading from "../../Loading/ButtonLoading";

export const Register = (props) => {
  const url = Constants.API_URL_REGISTER;
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setButtonPressed(true);

    if (firstname == "" || lastname == "" || email == "" || password == "") {
      alert("Please fill out all the fields");
      setButtonPressed(false);
    } else {
      const newUserCredential = {
        email: email,
        password: password,
        role: "user",
        firstname: firstname,
        surname: lastname,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserCredential),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`RESPONSE:  ${data}`);
          if (data.status == null) {
            setButtonPressed(false);
            dispatch(
              login({
                authenticated: data.authenticated,
                token: data.jwt,
                credentials: data,
              })
            );
            setButtonPressed(false);
            console.log("Success:", data);
          } else {
            console.error(data);
            alert(data.title);
            setButtonPressed(false);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          alert(error);
          setButtonPressed(false);
        });
    }
  };

  return (
    <div className="Form">
      <section>
        <h2>Registration Form</h2>
      </section>

      <form onSubmit={onSubmitHandler}>
        <label>Firsname:</label>
        <input
          type="name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <label>Lastname:</label>
        <input
          type="name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        ></input>

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
          {buttonPressed ? (
            <div className="loadingbutton">
              <ButtonLoading />
            </div>
          ) : (
            <p>Register</p>
          )}
        </button>
      </form>

      <button type="register" className="register" onClick={props.onChangePage}>
        Sign in here
      </button>
    </div>
  );
};
