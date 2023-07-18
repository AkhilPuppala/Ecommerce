import React, { useState } from "react";
import Layout from "./../../components/layouts/layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateAddress = (e) => {
    setAddress(e.target.value);
  };
  const updatePhone = (e) => {
    setPhone(e.target.value);
  };
  const updateAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/v1/auth/register",{name,email,password,address,phone,answer});
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
          <div className="mb-3">
            <h1 className="RegisterHeading">Register</h1>
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={updateName}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
            placeholder="Email address"
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
            </label>
            <input
            placeholder="Password"
              type="password"
              value={password}
              onChange={updatePassword}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={updateAddress}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={updatePhone}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            </label>
            <input
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={updateAnswer}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};
