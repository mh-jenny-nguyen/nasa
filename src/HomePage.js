import React from "react";
import { getImages, getAllImg } from "./request";
import InfiniteScroll from "react-infinite-scroller";
import "./HomePage.css";
import { masonryOptions } from "./exports";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./Card";
import Nothing from "./Nothing";
import {withPostConsumer} from './context';

function HomePage({context}) {
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [initialized, setInitialized] = React.useState(false);

  const {posts, getPosts, loadMore, nextPage} = context;

  React.useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      getPosts();
    }
  });

  return (
    <div className="page">
      {(() => {
        if (typeof posts !== "undefined" && posts.length > 0) {
          return (
            <InfiniteScroll
              pageStart={1}
              loadMore={nextPage}
              hasMore={loadMore}
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
                  {posts.map((item, i) => {
                    return (
                      item.cardId && (
                        <Card
                          key={i}
                          href={item.href}
                          location={item.location}
                          cardId={item.cardId}
                          desc={item.desc}
                          title={item.title}
                          dateCreated={item.date_created}
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
export default withPostConsumer(HomePage);
