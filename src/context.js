import React, { Component } from "react";
import { getAllImg, searchImgs } from "./request";

const PostContext = React.createContext();

class PostProvider extends Component {
  state = {
    loading: true,
    posts: [],
    modifiedPosts: [],
    currentPage: 1,
    sort: "newest",
    loadMore: true,
    searchPosts: [],
    keyword: "",
    currentSearchPage: 1,
    searchLoadMore: true,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.modifiedPosts) !==
      JSON.stringify(this.state.modifiedPosts)
    ) {
      localStorage.setItem(
        "modifiedPost",
        JSON.stringify(this.state.modifiedPosts)
      );
      console.log("update local storage");
    }
  }

  getData = async (p = 1) => {
    try {
      let response = await getAllImg(p);

      if (response?.data?.collection?.items?.length) {
        let posts = this.formatData(response.data.collection.items);
        posts = this.sortData(posts, this.state.sort);

        let isMore = response?.data?.collection?.links[0].href?.length
          ? true
          : false;

        let modifiedPosts = [];
        if (localStorage.getItem("modifiedPost") !== null) {
          modifiedPosts = JSON.parse(localStorage.getItem("modifiedPost"));
        }

        let mergedPost = this.mergeData(
          this.state.posts.concat(posts),
          modifiedPosts
        );

        this.setState({
          posts: mergedPost,
          loadMore: isMore,
          currentPage: p,
          modifiedPosts: modifiedPosts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  sortData(data, type = "newest") {
    let tempData = data;
    switch (type) {
      case "newest":
        tempData.sort(function (a, b) {
          return Date.parse(b.date_created) - Date.parse(a.date_created);
        });
        break;
      case "oldest":
        tempData.sort(function (a, b) {
          return Date.parse(a.date_created) - Date.parse(b.date_created);
        });
        break;
      case "atoz":
        tempData.sort(function (a, b) {
          return a.title.toUpperCase().localeCompare(b.title.toUpperCase());
        });

        break;
      case "ztoa":
        tempData.sort(function (a, b) {
          return b.title.toUpperCase().localeCompare(a.title.toUpperCase());
        });
        break;
      default:
        break;
    }

    return tempData;
  }

  formatData = (data) => {
    let tempData = data.map((item) => {
      let temp = {
        location: item?.data[0]?.center,
        href: item?.links[0]?.href,
        cardId: item?.data[0]?.nasa_id,
        desc: item?.data[0]?.description,
        title: item?.data[0]?.title,
        date_created: item?.data[0]?.date_created,
      };

      return temp;
    });

    return tempData;
  };

  mergeData = (arr, mArr) => {
    if (!Array.isArray(arr) || !Array.isArray(mArr)) {
      return [];
    }

    mArr.forEach((item) => {
      if (item.cardId) {
        let findIndex = arr.findIndex((c) => c.cardId === item.cardId);

        if (findIndex !== -1) {
          if (item.removed !== undefined && item.removed === true) {
            arr.splice(findIndex, 1);
          } else {
            arr[findIndex] = { ...arr[findIndex], ...item };
          }
        }
      }
    });

    return arr;
  };

  updateData = (nasa_id, changeData) => {
    debugger;
    let item = [];
    let modifiedPosts = JSON.parse(JSON.stringify(this.state.modifiedPosts));

    let findIndex = modifiedPosts.findIndex((item) => item.cardId === nasa_id);

    if (findIndex !== -1) {
      //modified
      let temp;
      item = { ...modifiedPosts[findIndex], ...changeData };
      modifiedPosts[findIndex] = item;
    } else {
      //new
      let findIndex2 = this.state.posts.findIndex(
        (item) => item.cardId === nasa_id
      );

      if (findIndex2 !== -1) {
        item = { ...this.state.posts[findIndex2], ...changeData };
        modifiedPosts.push(item);
      }
    }

    let tempPosts = this.mergeData(this.state.posts, modifiedPosts);
    let tempSearchPosts = this.mergeData(this.state.searchPosts, modifiedPosts);

    this.setState({
      modifiedPosts: modifiedPosts,
      post: tempPosts,
      searchPosts: tempSearchPosts,
    });
  };

  searchPosts = async (keyword, page = 1) => {
    try {
      let searchPosts = [];
      const response = await searchImgs(keyword, page);

      if (response?.data?.collection?.items?.length) {
        searchPosts = this.formatData(response.data.collection.items);
        searchPosts = this.sortData(searchPosts, this.state.sort);
      }

      let isMore = response?.data?.collection?.links[0].href?.length
        ? true
        : false;

      let modifiedPosts = [];
      if (localStorage.getItem("modifiedPost") !== null) {
        modifiedPosts = JSON.parse(localStorage.getItem("modifiedPost"));
      }

      let currentSearchPosts =
        page > 1 ? this.state.searchPosts.concat(searchPosts) : searchPosts;

      let mergedPost = this.mergeData(currentSearchPosts, modifiedPosts);

      this.setState({
        searchPosts: mergedPost,
        searchLoadMore: isMore,
        currentSearchPage: page,
        keyword: keyword,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getLikedPost = () => {
    let temp = this.state.modifiedPosts.filter(
      (item) => item.like !== undefined && item.like
    );

    return temp;
  };

  getRemovedPosts = () => {
    let temp = this.state.modifiedPosts.filter(
      (item) => item.removed !== undefined && item.removed
    );

    return temp;
  };

  handleLikePost = (nasa_id, like) => {
    debugger;
    this.updateData(nasa_id, { like: like });
  };

  handleNextPage = () => {
    let p = this.state.currentPage;
    p++;
    this.getData(p);
  };

  handleNextSearchPage = () => {
    let p = this.state.currentSearchPage;
    p++;
    this.searchPosts(this.state.keyword, p);
  };

  handleChangeSort = (type = "newest") => {
    this.sortData(this.state.posts, type);
    this.sortData(this.state.searchPosts, type);
    this.sortData(this.state.modifiedPosts, type);

    this.setState({
      sort: type,
      posts: JSON.parse(JSON.stringify(this.state.posts)),
      searchPosts: JSON.parse(JSON.stringify(this.state.searchPosts)),
      modifiedPosts: JSON.parse(JSON.stringify(this.state.modifiedPosts)),
    });
  };

  handleRemovePost = (nasa_id) => {
    this.updateData(nasa_id, { removed: true });
  };

  handleRestorePost = (nasa_id) => {
    this.updateData(nasa_id, { removed: false });
  };

  handleSetKeyword = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  render = () => {
    return (
      <PostContext.Provider
        value={{
          ...this.state,
          getPosts: this.getData,
          nextPage: this.handleNextPage,
          changeSort: this.handleChangeSort,
          likePost: this.handleLikePost,
          removePost: this.handleRemovePost,
          getLikedPost: this.getLikedPost,
          getRemovedPosts: this.getRemovedPosts,
          restorePost: this.handleRestorePost,
          setKeyWord: this.handleSetKeyword,
          getSearchPosts: this.searchPosts,
          nextSearchPage: this.handleNextSearchPage,
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
