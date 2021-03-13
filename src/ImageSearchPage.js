import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getImages, getAllImg, searchImgs } from "./request";
import InfiniteScroll from "react-infinite-scroller";
import "./HomePage.css";
import { masonryOptions } from "./exports";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./Card";
import Nothing from "./Nothing";

function ImageSearchPage() {
  const [keyword, setKeyword] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [searching, setSearching] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q");
    console.log(q);
    setKeyword(q);
    setPage(1);
    searchImages(q, 1);
  }, [location]);

  const searchImages = async (keyword, pg = 1) => {
    setSearching(true);
    const response = await searchImgs(keyword, page);
    let imgs = response.data.collection.items;
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
      {(() => {
        if (typeof images !== "undefined" && images.length > 0) {
          return (
            <InfiniteScroll
              pageStart={1}
              loadMore={getMoreImages}
              hasMore={total > images.length}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  350: 2,
                  480: 2,
                  768: 3,
                  900: 4,
                  1200: 6,
                }}
              >
                <Masonry gutter="10px">
                  {images.map((img, i) => {
                    return (
                      img.links &&
                      img.links[0] &&
                      img.links[0].href && (
                        <Card
                          key={i}
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
              </ResponsiveMasonry>
            </InfiniteScroll>
          );
        } else {
          return <Nothing />;
        }
      })()}
    </div>
  );
}
export default ImageSearchPage;
