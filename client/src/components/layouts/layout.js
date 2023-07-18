import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Layout(props) {
    return (
        <div>
            <Header/>
            <main style = {{minHeight:'75vh'}}>            
                {props.children}
            </main>
            <Footer/>
        </div>
    );
};
//export default Layout;