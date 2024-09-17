import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useContext(Context);


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        { name, email, phone, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

   const navigateTo = useNavigate();
    if (isAuthenticated) {
      navigateTo("/");
    }
  

  return (
    <>
      <section className="section">
        <form onSubmit={handleRegister}>
          <h3>REGISTER</h3>
          <div>
            <labe>Your Name</labe>
            <input
              type="text"
              placeholder="Please Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <labe>Your Email</labe>
            <input
              type="email"
              placeholder="Please Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <labe>Your Phone</labe>
            <input
              type="number"
              placeholder="Please Enter your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <labe>Your Password</labe>
            <input
              type="password"
              placeholder="Please Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>

          <div>
            Alreay Registered?
            <span className="alreadyRegister" onClick={() => navigateTo("/login")}>Login</span>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
