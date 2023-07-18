import React, { useState } from "react";
import Layout from "./../../components/layouts/layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {auth,setAuth} = useAuth();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/v1/auth/login",{email,password});
      alert(res.data.message);
      if(res.data.success)
      {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        
       localStorage.setItem('auth',JSON.stringify(res.data));
        navigate('/');
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
              Email address
            </label>
            <input
              type="email"
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={updatePassword}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
          <button type= "button" className="btn btn-primary" onClick = {() => {navigate('/forgot-password')}}>Forgot Password</button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};
