import React from 'react';
import Layout from '../../components/layouts/layout';
import UserMenu from '../../components/layouts/UserMenu';
import { useAuth } from '../../Context/auth';

export default function Dashboard(){
    const {auth} = useAuth();
    return (
        <Layout>
            <div className='conatiner-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h4>{auth?.user?.name}</h4>
                            <h4>{auth?.user?.email}</h4>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};