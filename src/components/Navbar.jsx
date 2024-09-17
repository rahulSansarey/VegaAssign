import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "../main";

function Navbar() {
  const { setIsAuthenticated, isAuthenticated } = useContext(Context);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/user/logout",

        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {isAuthenticated && (
        <nav>
          <div className="logo">
            {" "}
            TODO
            <span>HUB</span>
          </div>

          <Link to={"/"}>HOME</Link>
          <Link to={"/blogs"}>BLOGS</Link>
          <Link onClick={handleLogout}>LOGOUT</Link>
        </nav>
      )}
    </>
  );
}

export default Navbar;
