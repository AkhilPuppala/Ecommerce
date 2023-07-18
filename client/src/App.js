import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/DashBoard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}   />
      <Route path='/product/:slug' element={<ProductDetails/>}   />
      <Route path='/about' element={<About/>}   />
      {/* <Route path= '/dashboard' element={<PrivateRoute />}>
        <Route path= 'user' element={<Dashboard />} />
      </Route> */}
      {/* <Route path= '/dashboard' element={<AdminRoute/>}>
        <Route path= 'admin' element={<AdminDashboard />} />
      </Route> */}
      <Route path= '/admindashboard/create-category' element={<CreateCategory/>}  />
      <Route path= '/admindashboard/create-product' element={<CreateProduct/>}  />
      <Route path= '/admindashboard/product/:slug' element={<UpdateProduct/>}  />
      <Route path= '/admindashboard/users' element={<Users/>}  />
      <Route path= '/admindashboard/products' element={<Products/>}  />
      <Route path= '/admindashboard' element={<AdminDashboard/>}  />
      <Route path= '/dashboard' element={<Dashboard/>}  />
      <Route path= '/dashboard/orders' element={<Orders/>}  />
      <Route path= '/dashboard/profile' element={<Profile/>}  />
      <Route path='/contact' element={<Contact/>}   />
      <Route path='*' element={<PageNotFound/>}   />
      <Route path='/policy' element={<Policy/>}   />
      <Route path='/register' element={<Register/>}   />
      <Route path='/login' element={<Login/>} />
      <Route path ='/forgot-password' element={<ForgotPassword/>}   />
      <Route path ='/categories' element={<Categories/>}   />
      <Route path ='/category/:slug' element={<CategoryProduct/>}   />
      <Route path ='/cart' element={<CartPage/>}   />

    </Routes>
  );
}

export default App;
