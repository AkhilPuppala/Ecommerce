import react from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminMenu(){
    return(
            <>
                <div classname="text-center">
                    <ul className="list-group">
                        <h4 className='mx-auto'>DashBoard</h4>
                    <NavLink to = '/dashboard/profile' className="list-group-item" >Profile</NavLink>
                    <NavLink to = '/dashboard/orders' className="list-group-item">Orders</NavLink>
                    </ul>
                </div>

            </>
    );
};