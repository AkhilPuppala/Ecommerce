import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/layout";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <button>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
