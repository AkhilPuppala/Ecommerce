import React from 'react';
import { useSearch } from '../../Context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useSearch(); // Update destructured names
  
  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/search${auth.keyword}`);
      setAuth({ ...auth, results: data }); // Update setAuth function
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={auth.keyword} // Update value
          onChange={(e) => setAuth({ ...auth, keyword: e.target.value })} // Update setAuth function
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
