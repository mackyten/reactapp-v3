import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authenticatorSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const onLogoutPressed = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="header">
      <h2>Note Taking App</h2>
      <button onClick={onLogoutPressed}>Logout</button>
    </div>
  );
};

export default Header;
