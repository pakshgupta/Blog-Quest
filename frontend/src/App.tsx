import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import Status from "./pages/Status";
import Write from "./pages/Write";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/post/create-post/" element={<Write />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/signout" element={<Logout />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/status" element={<Status />} />
        <Route path="/user/signin" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
