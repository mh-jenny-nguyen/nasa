import React from "react";  
import { getImages, getAllImg } from "./request";  
import InfiniteScroll from "react-infinite-scroller";  
import Masonry from "react-masonry-component";  
import "./HomePage.css";  
import { masonryOptions } from "./exports";
import {ReactComponent as HeartIcon} from './assets/img/heart-solid.svg';
import {ReactComponent as TrashIcon} from './assets/img/trash-solid.svg';
import {ReactComponent as EditIcon} from './assets/img/pencil-alt-solid.svg';
import {truncateWithEllipsis} from './helper';
import { Link } from "react-router-dom";

function HomePage() {  
  const [images, setImages] = React.useState([]);  
  const [page, setPage] = React.useState(1);  
  const [total, setTotal] = React.useState(0);  
  const [initialized, setInitialized] = React.useState(false); 

  const getAllImages = async (pg = 1) => {  
    const response = await getAllImg(page);
    let imgs = images.concat(response.data.collection.items);  
    setImages(imgs);  
    let total = response.data.collection.metadata.total_hits;
    setTotal(total);  
    pg++;  
    setPage(pg);  
  }; 

  React.useEffect(() => {  
    if (!initialized) {  
      getAllImages();  
      setInitialized(true);  
    }  
  }); 

  return (  
    <div className="page">  
      <h1 className="text-center">Home</h1>  
      <InfiniteScroll  
        pageStart={1}  
        loadMore={getAllImages}  
        hasMore={total > images.length}  
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
              <div className="card" key={i}>  
                <img className="card__img" src={img.links[0].href} style={{ width: 300 }} />
                <div className="card__detail">
                    <div className="card__location">{img?.data[0]?.center}</div>
                    <div className="card__control">
                      <button className="card__btn-like" type="button" title="Like photo" width="30" height="30"><HeartIcon/></button>
                      <Link className="card__btn-edit" to={`/edit/${img?.data[0]?.nasa_id}`} ><EditIcon/></Link>
                      <button className="card__btn-remove" type="button" title="Remove photo"><TrashIcon/></button>
                    </div>
                    <div className="card__desc">
                      {truncateWithEllipsis(img?.data[0]?.description, 20)}
                    </div>
                </div>
                <div className="card__title">{truncateWithEllipsis(img?.data[0]?.title, 20)}</div>
              </div>  
            );  
          })}  
        </Masonry>  
      </InfiniteScroll>  
    </div>  
  );  
}  
export default HomePage;