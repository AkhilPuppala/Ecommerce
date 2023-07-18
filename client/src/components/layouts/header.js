import React, { useState, useEffect } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import { useAuth } from '../../Context/auth';
import SearchInput from '../Form/SearchInput';
import { useNavigate,useHistory } from 'react-router-dom';
import { useCart } from '../../Context/cart';

export default function Header() {
  const { auth, setAuth } = useAuth();
  const [cart] = useCart();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    alert('Logged out');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/v1/category/get-category');
        const data = await response.json();
        setCategories(data?.category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <FaShopify />
          <NavLink to="/" className="navbar-brand" href="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput className="text-center" />
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page" href="#">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <Link className="dropbtn" onClick={toggleDropdown} style={{ textDecoration: 'none' }}>
                    Categories
                  </Link>
                  {isOpen && (
                    <div className="dropdown-content">
                        <Link to={'/categories'} className="dropdown-item" href="#">
                          All Categories
                        </Link>
                      {categories.map((category) => (
                        <Link key={category._id} to={`/category/${category.slug}`} className="dropdown-item" href="#">
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item" aria-expanded="false">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : auth.user.role === 0 ? (
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/dashboard" className="dropdown-item" href="#">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" onClick={handleLogout} className="dropdown-item" href="#">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/admindashboard" className="dropdown-item" href="#">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" onClick={handleLogout} className="dropdown-item" href="#">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart {cart?.length}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
