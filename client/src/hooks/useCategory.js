import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/category/get-category');
        console.log(response.data);
        setCategories(response.data?.categories || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
}
