import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import "./HomePage.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./Card";
import Nothing from "./Nothing";
import { withPostConsumer } from "./context";

function ImageSearchPage({ context }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");
  const {
    searchPosts,
    searchLoadMore,
    currentSearchPage,
    getSearchPosts,
    nextSearchPage,
    likePost,
    removePost,
  } = context;

  React.useEffect(() => {
    getSearchPosts(keyword, 1);
  }, [location]);

  const getMoreImages = async () => {
    nextSearchPage();
  };

  return (
    <div className="page">
      {(() => {
        if (typeof searchPosts !== "undefined" && searchPosts.length > 0) {
          return (
            <InfiniteScroll
              pageStart={1}
              loadMore={getMoreImages}
              hasMore={searchLoadMore}
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
                  {searchPosts.map((item, i) => {
                    return (
                      item.cardId && (
                        <Card
                          key={item.cardId}
                          href={item.href}
                          location={item.location}
                          cardId={item.cardId}
                          desc={item.desc}
                          title={item.title}
                          dateCreated={item.date_created}
                          likeState={
                            item.like !== undefined && item.like ? true : false
                          }
                          onClickLikeBtn={likePost}
                          onClickRemoveBtn={removePost}
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
export default withPostConsumer(ImageSearchPage);
