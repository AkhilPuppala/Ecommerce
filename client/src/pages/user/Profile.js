import React,{useState,useEffect} from 'react';
import Layout from '../../components/layouts/layout';
import UserMenu from '../../components/layouts/UserMenu';
import { useAuth } from '../../Context/auth';
import axios from 'axios';

export default function Profile(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const {auth,setAuth} = useAuth();

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

      useEffect(() => {
        if (auth?.user) {
          const { email, name, phone, address } = auth.user;
          setName(name);
          setPhone(phone);
          setEmail(email);
          setAddress(address);
        }
      }, [auth?.user]);
      

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const data = await axios.post("/api/v1/auth/profile",{name,email,password,address,phone});
          if(data?.error){
              alert(data?.error)
          }
          else{
              setAuth({...auth,user:data?.updatedUser})
              let ls = localStorage.getItem("auth")
              ls = JSON.parse(ls)
              ls.user = data.updatedUser;
              localStorage.setItem("auth",JSON.stringify(ls));
              alert("User Updated Successfully")
          }
        }catch(error){
          console.log(error);
          alert("Something went wrong");
        }
      };

    return (
        <Layout>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-9'>
                    <div className="register">
                            <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <h1 className="RegisterHeading">User Profile</h1>
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
                                disabled
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
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};