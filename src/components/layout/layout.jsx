import React from 'react';
import Nav from './nav/nav';
import Footer from './footer/footer';
import { useResize } from '@consts/hooks/resize';
import Drawer from './drawer/drawer';

const Layout = ( {children} ) => {
  return (
  <div className='container'>
    {useResize() >=500 ? <Nav/> : <Drawer/>}
    {children}    
    <Footer/>
  </div>
  );
};

export default Layout;