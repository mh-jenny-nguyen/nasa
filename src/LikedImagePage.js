import React from "react";
import PageContainer from "./PageContainer";
import { withPostConsumer } from "./context";
import Nothing from "./Nothing";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./Card";

function LikedImagePage({ context }) {
  const [initialized, setInitialized] = React.useState(false);
  const [likedPost, setLikedPost] = React.useState([]);
  const {
    modifiedPosts,
    likePost,
    getLikedPost,
    sort
  } = context;

  React.useEffect(() => {
    if( ! initialized) {
        setLikedPost(getLikedPost());
        setInitialized(true);
    }
  });

  React.useEffect(() => {
    setLikedPost(getLikedPost());
  }, [modifiedPosts]);

  return (
    <PageContainer>
      {(() => {
        if (typeof likedPost !== "undefined" && likedPost.length > 0) {
          return (
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
                {likedPost.map((item, i) => {
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
                        showRemoveBtn={false}
                        showEditBtn={false}
                        onClickLikeBtn={likePost}
                      />
                    )
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          );
        } else {
          return <Nothing />;
        }
      })()}
    </PageContainer>
  );
}

export default withPostConsumer(LikedImagePage);
