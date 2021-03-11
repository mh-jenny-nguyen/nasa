import React from "react";  
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";  
import Form from "react-bootstrap/Form";  
import Col from "react-bootstrap/Col";  
import Button from "react-bootstrap/Button";  
import * as yup from "yup";  
import InfiniteScroll from "react-infinite-scroller";  
import Masonry from "react-masonry-component";  
import { masonryOptions } from "./exports";  
import { searchImgs } from "./request";

function ImageSearchPage() {  
  const [keyword, setKeyword] = React.useState([]);  
  const [images, setImages] = React.useState([]);  
  const [page, setPage] = React.useState(1);  
  const [total, setTotal] = React.useState(0);  
  const [searching, setSearching] = React.useState(false); 
  const location = useLocation();

  useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const q = searchParams.get('q');
      console.log(q);
      setKeyword(q);
      setPage(1);
      searchImages(q, 1);  
  }, [location]);

  const searchImages = async (keyword, pg = 1) => {  
    setSearching(true); 
    const response = await searchImgs(keyword, page);  
    let imgs = images.concat(response.data.collection.items); 
    setImages(imgs);  
    setTotal(response.data.collection.metadata.total_hits);  
    setPage(pg);  
  }; 

  const getMoreImages = async () => {  
    let pg = page;  
    pg++;  
    const response = await searchImgs(keyword, pg);  
    let imgs = images.concat(response.data.collection.items); 
    setImages(imgs);  
    setTotal(response.data.collection.metadata.total_hits);  
    setPage(pg);  
  }; 

  React.useEffect(() => {}); 

  return (  
    <div className="page">  
      <InfiniteScroll  
        pageStart={1}  
        loadMore={getMoreImages}  
        hasMore={searching && total > images.length}  
      >  
        <Masonry  
          className={"grid"}  
          elementType={"div"}  
          options={masonryOptions}  
          disableImagesLoaded={false}  
          updateOnEachImageLoad={false}  
        >  
          {images.map((img, i) => {  
            return ( img.links && img.links[0]  && img.links[0].href &&
              <div key={i}>  
                <img src={img.links[0].href} style={{ width: 300 }} />  
              </div>  
            );   
          })}  
        </Masonry>  
      </InfiniteScroll>  
    </div>  
  );  
}  
export default ImageSearchPage;