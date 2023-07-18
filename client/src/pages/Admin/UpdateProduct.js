import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from 'axios';
import { useAuth } from "../../Context/auth";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState();
  const [id, setID] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setName(data.product.name);
      setID(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category", { headers: { "Authorization": `Bearer ${auth?.token}` } });
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    // Cleanup function
    return () => {
      setCategories([]);
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Form submitted");
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Price:", price);
        console.log("Quantity:", quantity);
        console.log("Category:", category);
        console.log("Shipping:", shipping);
        console.log("Photo:", photo);
    
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);
      productData.append("shipping", shipping ? "1" : "0");
      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData, { headers: { "Authorization": `Bearer ${auth?.token}` } });
      if (data.success) {
        alert(data.message);
        navigate('/admindashboard/products');
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      alert("Could not update product");
    }
  };
  
  const handleChangeCategory = (value) => {
    setCategory(value);
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    try{
      let answer = window.prompt("Do you want to delete the product")
        const {data}= await axios.delete(`/api/v1/product/delete-product/${id}`,{ headers:{
            "Authorization": auth?.token
        }}); 
            console.log("deleted successfully");
            navigate('/admindashboard/products');

    }
    catch(error)
    {
        console.log(error);
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
              <h1>Update Product</h1>
              <div className="m-1 w-75">
              <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={handleChangeCategory}
                    value={category.name}
                    >
                    {categories && categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>

                    ))}
                    </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className="img img-responsive" />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className="img img-responsive" />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input type="text" placeholder="Name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder="Description" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder="Price" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder="Quantity" value={quantity} className="form-control" onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                  <Select bordered={false} placeholder="Select Shipping" size="large" showSearch className="form-select mb-3" onChange={(value) => { setShipping(value === "1"); }} value={shipping ? "1" : "0"}>
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleSubmit}>Update Product</button>
                </div>
                <div className='mb-3'>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
