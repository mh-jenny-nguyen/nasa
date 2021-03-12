import React from "react";
import { getImages, getAllImg } from "./request";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
import "./HomePage.css";
import { masonryOptions } from "./exports";
import { ReactComponent as HeartIcon } from "./assets/img/heart-solid.svg";
import { ReactComponent as TrashIcon } from "./assets/img/trash-solid.svg";
import { ReactComponent as EditIcon } from "./assets/img/pencil-alt-solid.svg";
import { truncateWithEllipsis } from "./helper.js";
import { Link } from "react-router-dom";
import Card from "./Card";

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
          className={"masonry-grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {images.map((img, i) => {
            return (
              img.links &&
              img.links[0] &&
              img.links[0].href && (
                <Card
                  id={i}
                  href={img?.links[0]?.href}
                  location={img?.data[0]?.center}
                  cardId={img?.data[0]?.nasa_id}
                  desc={img?.data[0]?.description}
                  title={img?.data[0]?.title}
                />
              )
            );
          })}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
export default HomePage;
