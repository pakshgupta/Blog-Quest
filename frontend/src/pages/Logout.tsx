import { useNavigate } from "react-router-dom";
import { postAPI } from "../app/api/postAPI";
import { useLogoutMutation } from "../app/api/userAPi";
import { useAppDispatcher, useAppSelector } from "../app/hook";
import { userNotExist } from "../features/userSlice";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatcher();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.userReducer.user?._id);
  const handleClick = async () => {
    await logout();
    dispatch(postAPI.util.invalidateTags([{ type: "posts" }]));
    dispatch(userNotExist());
    localStorage.removeItem("user");
    navigate("/");
  };
  return <button onClick={handleClick}>Logout</button>;
};

export default Logout;
