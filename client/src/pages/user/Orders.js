import react from 'react';
import Layout from '../../components/layouts/layout';
import UserMenu from '../../components/layouts/UserMenu'
export default function Orders(){
    return (
        <Layout>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-9'>Orders</div>
                </div>
            </div>
        </Layout>
    );
};