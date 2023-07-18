import react from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/AdminMenu";
export default function Users(){
    return(
        <Layout>
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                        <h1>Users</h1>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};