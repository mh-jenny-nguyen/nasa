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
    <React.Fragment>
      {loading && 
        <FullPageLoader/>
      }
      <Header />
      <div className="container">
        {props.children}
      </div>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Layout;
