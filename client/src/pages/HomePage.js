import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/layout";
import { AuthProvider, useAuth } from "../Context/auth";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";

export default function HomePage() {
  const { auth, setAuth } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart,setCart] = useCart();

  const Loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    Loadmore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      //setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      //setLoading(false);
      setProducts(data.products);
    } catch (error) {
      //setLoading(false);
      console.log(error);
      alert("Something went wrong in getting all categories");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);    }
  };

  useEffect(() => {
      getAllCategories();
  },[])

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
  }},[checked.length,radio.length]);
  
  useEffect(() => {
    if (checked.length || radio.length) {
      filteredProduct();
    }
  }, [checked, radio]);
  
  
  const handleFilter = async(value,id) => {
    console.log(`value ${value}`)
    let newAll = [] 
    function filte(val){
      return val !== id;
    }
    let all =[...checked];
    if(value)
    {
      all.push(id);
      console.log("push");
    }
    else
    {
      console.log("pop");
      all = all.filter(filte);
    }
    setChecked(all);
  } 
  
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      alert("Could not filter");
    }
  };
  
  useEffect(() => {
  filteredProduct();
}, [checked, radio, auth]);


  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center p-3">Filter by Category</h4>
          <div className="d-flex flex-column p-3">
            {categories?.map((c) => (
              <Checkbox
                key={c.i_id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center p-3">Filter by Price</h4>
          <div className="d-flex flex-column p-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger p-3 m-3" onClick={() => window.location.reload()}>
              RESET
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center p-3">All Products</h1>
          <div className="d-flex flex-wrap">
    {products?.map((p) => (
      <div className="card m-3" style={{ width: "18rem" }} key={p._id}>
        <img
          src={`/api/v1/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
        />
        <div className="card-body">
          <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description.substring(0, 30)}...</p>
          <p className="card-text">${p.price}</p>
          <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
          <button className="btn btn-secondary ms-1" onClick={() => {setCart([...cart,p]); alert("Added to cart");localStorage.setItem('cart',JSON.stringify([...cart,p]))}}>Add to cart</button>
        </div>
      </div>
    ))}
</div>


          <div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
