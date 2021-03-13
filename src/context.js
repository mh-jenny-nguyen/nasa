import React, { Component } from "react";
import { getAllImg, searchImgs } from "./request";
import {compareDate} from './helper';

const PostContext = React.createContext();

class PostProvider extends Component {
  state = {
    posts: [],
    modifiedPosts: [],
    loading: true,
    currentPage: 1,
    keyword: "",
    sort: "newest",
    total: 0,
    loadMore: true,
  };

  getData = async (p = 1) => {
    try {
      let response = await getAllImg(p);

      if (response?.data?.collection?.items?.length) {
        let posts = this.formatData(response.data.collection.items);

        posts = this.sortData( posts, this.state.sort);

        let isMore = response?.data?.collection?.links[0].href?.length
          ? true
          : false;

        this.setState({
          posts: this.state.posts.concat(posts),
          loadMore: isMore,
          currentPage: p,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  sortData(data, type = "newest") {
    let tempData = data;
    switch (type) {
      case 'newest':
        tempData.sort(function (a,b) {
          // debugger;
          return (b.date_created - a.date_created);
        });
        break;
      case 'oldest':
        tempData.sort(function (a,b) {
          // debugger;
          return (a.date_created - b.date_created);
        });
        break;
      case 'atoz':
        tempData.sort(function (a,b) {
          return (a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
        });

        break;
      case 'ztoa':
        tempData.sort(function (a,b) {
          // debugger;
          return (b.title.toUpperCase().localeCompare(a.title.toUpperCase()));
        });
        break;
      default:
        break;
    }

    return tempData;
  }

  formatData = (data) => {
    let tempData = data.map((item) => {
      let timestamp = Date.parse(item?.data[0]?.date_created);

      let temp = {
        location: item?.data[0]?.center,
        href: item?.links[0]?.href,
        cardId: item?.data[0]?.nasa_id,
        desc: item?.data[0]?.description,
        title: item?.data[0]?.title,
        date_created: (timestamp ? new Date(timestamp): '')
      };

      return temp;
    });

    return tempData;
  };

  handleNextPage = () => {
    let p = this.state.currentPage;
    p++;
    this.getData(p);
  };

  handleChangeSort = (type ="newest") => {
    this.sortData(this.state.posts, type);
    this.setState({
      posts: this.state.posts
    });
  }

  render = () => {
    return (
      <PostContext.Provider
        value={{
          ...this.state,
          getPosts: this.getData,
          nextPage: this.handleNextPage,
          changeSort: this.handleChangeSort,
        }}
      >
        {this.props.children}
      </PostContext.Provider>
    );
  };
}

const PostConsumer = PostContext.Consumer;

export function withPostConsumer(Component) {
  return function consumerWrapper(props) {
    return (
      <PostConsumer>
        {(value) => <Component {...props} context={value} />}
      </PostConsumer>
    );
  };
}

export { PostProvider, PostConsumer, PostContext };
