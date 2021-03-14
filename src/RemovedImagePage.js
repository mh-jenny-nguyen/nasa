import React from "react";
import PageContainer from "./PageContainer";
import { withPostConsumer } from "./context";
import Nothing from "./Nothing";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Card from "./Card";

function RemovedImagePage({ context }) {
  const [initialized, setInitialized] = React.useState(false);
  const [removedPosts, setRemovedPosts] = React.useState([]);
  const {
    modifiedPosts,
    getRemovedPosts,
    restorePost,
    sort,
  } = context;

  React.useEffect(() => {
    if( ! initialized) {
        setRemovedPosts(getRemovedPosts());
        setInitialized(true);
    }
  });

  React.useEffect(() => {
    setRemovedPosts(getRemovedPosts());
  }, [modifiedPosts]);

  return (
    <PageContainer>
      {(() => {
        if (typeof removedPosts !== "undefined" && removedPosts.length > 0) {
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
                {removedPosts.map((item, i) => {
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
                        showLikeBtn={false}
                        showRemoveBtn={false}
                        showEditBtn={false}
                        showUndoBtn={true}
                        onClickUndoBtn={restorePost}
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

export default withPostConsumer(RemovedImagePage);
