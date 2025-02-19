import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppDispatcher, useAppSelector } from "./app/hook";
import Navbar from "./components/Navbar";
import { CommentToggleProvider } from "./contexts/CommentToggleProvider";
import { userExist } from "./features/userSlice";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import SinglePost from "./pages/SinglePost";
import Status from "./pages/Status";
import Write from "./pages/Write";

const App = () => {
  const { user, loading: userLoading } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatcher();

  const [isLoading, setIsLoading] = useState(true); // Add local loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) dispatch(userExist(JSON.parse(storedUser)));
    setIsLoading(false); // Stop loading once user check is complete
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <LandingPage />} />
        <Route path="/post/create-post/" element={<Write />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/signout" element={<Logout />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/status" element={<Status />} />
        <Route path="/user/signin" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />

        <Route
          path="/post/:id"
          element={
            <CommentToggleProvider>
              <SinglePost />
            </CommentToggleProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default React.memo(App); // Memoize the App component to prevent unnecessary re-renders
