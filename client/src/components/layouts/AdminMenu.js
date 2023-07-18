import react from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminMenu(){
    return(
            <>
                <div classname="text-center">
                    <ul className="list-group">
                        <h4 className='mx-auto'>Admin Panel</h4>
                    <NavLink to = '/admindashboard/create-category' className="list-group-item" >Create Category</NavLink>
                    <NavLink to = '/admindashboard/create-product' className="list-group-item">Create Product</NavLink>
                    <NavLink to = '/admindashboard/users'className="list-group-item">Users</NavLink>
                    <NavLink to = '/admindashboard/products'className="list-group-item">Products</NavLink>
                    </ul>
                </div>

            </>
    );
};