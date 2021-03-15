import React from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroller";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "../../components/Card";
import Nothing from "../../components/Nothing";
import PageContainer from '../../components/PageContainer';
import {withPostConsumer} from '../../context';

function HomePage({context}) {
  const [initialized, setInitialized] = React.useState(false);
  const {posts, getPosts, loadMore, nextPage, likePost, removePost, loading} = context;

  React.useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      getPosts(1);
    }
  });

  const getMore = async() => {
      if( ! loading) {
        nextPage();
      }
  }

  return (
    <PageContainer>
      {(() => {
        if (typeof posts !== "undefined" && posts.length > 0) {
          return (
            <InfiniteScroll
              pageStart={1}
              loadMore={getMore}
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
                          key={item.cardId}
                          href={item.href}
                          location={item.location}
                          cardId={item.cardId}
                          desc={item.desc}
                          title={item.title}
                          dateCreated={item.date_created}
                          likeState={(item.like !== undefined && item.like ? true : false)}
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
    </PageContainer>
  );
}
export default withPostConsumer(HomePage);
