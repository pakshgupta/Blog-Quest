import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/api/userAPi";
import { useAppDispatcher } from "../app/hook";
import { userExist } from "../features/userSlice";
import { User } from "../types";

const Signup = () => {
  const [register] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const dispatch = useAppDispatcher();
  const navigate = useNavigate();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await register({
        name,
        email,
        password,
        gender,
        dob,
      });
      if (result?.data?.success) {
        dispatch(userExist(result.data as User));
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/user/signin");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-500 bg-gradient-to-b from-white/30 via-white/50 to-white/80">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Sign Up
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

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
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-600"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter your Date of Birth"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={(e) => handleClick(e)}
              className="w-full py-2 text-white transition duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/user/signin"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
