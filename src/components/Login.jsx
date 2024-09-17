import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setUser(data.user); // Assuming the response contains user data
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Use useEffect to navigate after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="section">
      <form onSubmit={handleLogin}>
        <h3>LOGIN</h3>

        <div>
          <label>Your Email</label>
          <input
            type="email"
            placeholder="Please Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Your Password</label>
          <input
            type="password"
            placeholder="Please Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <div>
          Not Registered?{" "}
          <span className="signUp" onClick={() => navigate("/register")}>
            SignUp
          </span>
        </div>
      </form>
      <Toaster />
    </section>
  );
}

export default Login;
