import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../app/api/userAPi";
import { useAppDispatcher } from "../app/hook";
import { userNotExist } from "../features/userSlice";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatcher();
  const navigate = useNavigate();
  const handleClick = async () => {
    await logout();
    dispatch(userNotExist());
    localStorage.removeItem("user");
    navigate("/");
  };
  return <button onClick={handleClick}>Logout</button>;
};

export default Logout;
