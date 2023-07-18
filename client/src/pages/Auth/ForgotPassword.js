import React, { useState } from "react";
import Layout from "./../../components/layouts/layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateNewPassword = (e) => {
    setnewPassword(e.target.value);
  };
  const updateAnswer= (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/v1/auth/forgot-password",{email,newPassword,answer});
      alert(res.data.message);
      if(res.data.success)
      {
        navigate('/login');
      }
    }catch(error){
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
        <h1 className="RegisterHeading">Login</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={updateEmail}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={updateNewPassword}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
            </label>
            <input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={updateAnswer}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};
