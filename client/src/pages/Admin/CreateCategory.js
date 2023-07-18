import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from 'axios';
import { CategoryForm } from "../../components/Form/CategoryForm";
import {Modal} from  'antd';
import { useAuth } from "../../Context/auth";


export default function CreateCategory(){
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  const [visible,setVisible] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName] = useState("");
  const {auth,setAuth} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(auth?.token);
      const {data} = await axios.post('/api/v1/category/create-category',{name},{headers:{"Authorization":`Bearer ${auth?.token}`}});
      alert(data.message);
      if(data.success){
        getAllCategories();
        alert("Successfully created category");
      }
      else{
        alert(data.message);
      }
    }
    catch(error){
      console.log(error);
      alert("Something went wrong in input form");
    }
  }
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category",{headers:{"Authorization":`Bearer ${auth?.token}`}});
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting all categories");
    }
  };



  useEffect(() => {
    getAllCategories();
    return () => {}
  }, []);

  const handleUpdate = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName},{headers:{"Authorization":`Bearer ${auth?.token}`}});
      if(data.success){
        alert("Name is updated");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      }

    }
    catch(error){
      console.log(error);
      alert("Something went wrong");
    }
  }

  const handleDelete = async(id) => {
    try{
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`,{headers:{"Authorization":`Bearer ${auth?.token}`}});
      if(data.success){
        alert("Category is deleted");
        getAllCategories();
      }

    }
    catch(error){
      console.log(error);
      alert("Something went wrong")
    }
  }
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1>Manage Category</h1>
              <div className="p-3" w-50>
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {categories.map((c) => (
                    <>
                    <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className= 'btn btn-primary ms-2' onClick={() => {setVisible(true);setUpdatedName(c.name);setSelected(c);}}>Edit</button>
                          <button className= 'btn btn-danger ms-2 ' onClick={() => {handleDelete(c._id)}}>Delete</button>
                          </td>
                    </tr>
                    </>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}


