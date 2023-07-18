import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const { auth } = useAuth();
    const [ok, setOK] = useState(false);
  
    useEffect(() => {
      const authCheck = async () => {
        try {
          const res = await axios.get('/api/v1/auth/user-auth');
          if (res.data.ok) {
            setOK(true);
          } else {
            setOK(false);
          }
        } catch (error) {
          setOK(false);
          console.log(error);
        }
      };
  
      if (auth?.token) {
        authCheck();
      } else {
        setOK(false);
      }
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner />;
  }