import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/api/userAPi";
import { useAppDispatcher } from "../app/hook";
import { userExist } from "../features/userSlice";
import { User } from "../types";

const Login = () => {
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatcher();
  const navigate = useNavigate();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      dispatch(userExist(result.data as User));
      if (result.data) {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-500 bg-gradient-to-b from-white/30 via-white/50 to-white/80">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 text-white transition duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={(e) => handleClick(e)}
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/user/signup"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
