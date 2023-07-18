import react from 'react';
import AdminMenu from '../../components/layouts/AdminMenu';
import Layout from '../../components/layouts/layout'
import { useAuth } from '../../Context/auth';

export default function AdminDashboard(){
    const {auth} = useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h4>Admin Name: {auth?.user?.name}</h4>
                            <h4>Admin EmailId: {auth?.user?.email}</h4>
                            <h4>Admin Phone Number: {auth?.user?.phone}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
