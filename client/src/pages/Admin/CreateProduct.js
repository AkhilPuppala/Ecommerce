import React,{useState,useEffect} from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from 'axios';
import { useAuth } from "../../Context/auth";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";


const {Option} = Select

export default function CreateProduct(){
    const navigate = useNavigate();
    const [categories,setCategories] = useState([]);
    const [photo,setPhoto] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [quantity,setQuantity] = useState("");
    const [shipping,setShipping] = useState("");
    const {auth,setAuth} = useAuth();

    //get all categories
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

      //create product
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            productData.append("photo",photo);
            productData.append("category",category);

            const {data} = await axios.post('/api/v1/product/create-product',productData,{headers:{"Authorization":`Bearer ${auth?.token}`}});
            if(data.success){
                alert(data?.message);
            }
            else{
                alert("Product created successfully");
                navigate('/admindashboard/products')
            }
        }
        catch(error){
            console.log(error);
            alert("Could not create product");
        }
    }

    return(
        <Layout>
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                {c.name}
                                </Option>
                            ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12" >
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt = "product_photo" height={'200px'} className="img img-responsive"/>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type = "text" placeholder="Name" value={name} className="form-control" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type = "text" placeholder="Description" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type = "text" placeholder="Price" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <input type = "text" placeholder="Quantity" value={quantity} className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <Select bordered={false} placeholder="SelectShipping" size="large" showSearch className="form-select mb-3" onChange={(value) => {setShipping(value);}}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleSubmit}>Create Product</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
        
    );
};