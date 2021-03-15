import React from "react";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import FullPageLoader from "../components/FullPageLoader";
import {useContext} from 'react';
import {PostContext} from  '../context';

const Layout = (props) => {
  let context = useContext(PostContext);
	let {loading} = context;

  return (
    <div className="wrap">
      {loading && 
        <FullPageLoader/>
      }
      <Header />
      <div className="container">
        {props.children}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Layout;
