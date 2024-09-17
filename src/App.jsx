import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";

import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios"; // Import axios
import { Context } from "./main";

function App() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/user/getUser",
          { withCredentials: true }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    getUser();
  }, [isAuthenticated]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <Toaster></Toaster>
    </Router>
  );
}

export default App;
