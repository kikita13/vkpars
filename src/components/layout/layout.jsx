import React from 'react';
import Nav from './nav/nav';
import Footer from './footer/footer';

const Layout = ( {children} ) => {
  return (
  <div className='container'>
    <Nav/>
    {children}    
    <Footer/>
  </div>
  );
};

export default Layout;