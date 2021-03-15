import React, { Component } from "react";
import { getAllImg, searchImgs, getPostDetail } from "./request";

const PostContext = React.createContext();

class PostProvider extends Component {
  state = {
    loading: true,
    posts: [],
    modifiedPosts: [],
    currentPage: 1,
    sort: "newest",
    loadMore: true,
    keyword: "",
  };

  componentDidMount() {
    if (localStorage.getItem("modifiedPost") !== null) {
      let modifiedPosts = JSON.parse(localStorage.getItem("modifiedPost"));
      this.state.modifiedPosts = modifiedPosts;
      this.setState({loading: false});
    }
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
    }
  }

  getData = async (p = 1, keyword = "") => {
    this.setState({ loading: true });

    try {
      let response;

      if (keyword.length === 0) {
        response = await getAllImg(p);
      } else {
        response = await searchImgs(keyword, p);
      }

      if (response?.data?.collection?.items) {
        let posts = this.formatData(response.data.collection.items);
        posts = this.sortData(posts, this.state.sort);

        let isMore = response?.data?.collection?.links?.length ? true : false;

        let modifiedPosts = [];
        if (localStorage.getItem("modifiedPost") !== null) {
          modifiedPosts = JSON.parse(localStorage.getItem("modifiedPost"));
        }

        let currentPosts = p > 1 ? this.state.posts.concat(posts) : posts;

        let mergedPost = this.mergeData(currentPosts, modifiedPosts);

        this.setState({
          posts: mergedPost,
          loadMore: isMore,
          currentPage: p,
          modifiedPosts: modifiedPosts,
          keyword: keyword,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });

    }
  };

  sortData(data, type = "newest") {
    this.setState({ loading: false });

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

    this.setState({ loading: false });
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
    this.setState({ loading: true });

    let flag = false;
    let item = [];
    let modifiedPosts = JSON.parse(JSON.stringify(this.state.modifiedPosts));

    let findIndex = modifiedPosts.findIndex((item) => item.cardId === nasa_id);

    if (findIndex !== -1) {
      //modified
      item = { ...modifiedPosts[findIndex], ...changeData };
      modifiedPosts[findIndex] = item;
      flag = true;
    } else {
      //new
      let findIndex2 = this.state.posts.findIndex(
        (item) => item.cardId === nasa_id
      );

      if (findIndex2 !== -1) {
        item = { ...this.state.posts[findIndex2], ...changeData };
        modifiedPosts.push(item);
        flag = true;
      }
    }

    let tempPosts = this.mergeData(this.state.posts, modifiedPosts);

    this.setState({
      modifiedPosts: modifiedPosts,
      posts: tempPosts,
      loading: false,
    });

    return flag;
  };

  getPostDetail = async (nasa_id) => {
    let item = this.state.modifiedPosts.find((item) => item.cardId === nasa_id);

    if (item) {
      return item;
    }

    this.setState({ loading: true });
    try {
      let response = await getPostDetail(nasa_id);
      if (response?.data?.collection?.items) {
        let item = this.formatData(response.data.collection.items);

        this.setState({
          posts: item,
          loading: false,
        });

        return item[0];
      }
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }

    return false;
  };

  getLikedPost = () => {
    this.setState({ loading: true });
    let temp = this.state.modifiedPosts.filter(
      (item) => item.like !== undefined && item.like && item.removed !== true
    );
    
    this.setState({ loading: false });
    return temp;
  };

  getRemovedPosts = () => {
    this.setState({ loading: true });

    let temp = this.state.modifiedPosts.filter(
      (item) => item.removed !== undefined && item.removed
    );

    this.setState({ loading: false });

    return temp;
  };

  handleEditPost = (nasa_id, changeData) => {
    return this.updateData(nasa_id, changeData);
  };

  handleLikePost = (nasa_id, like) => {
    this.updateData(nasa_id, { like: like });
  };

  handleNextPage = (keyword = "") => {
    let p = this.state.currentPage;
    p++;

    if (keyword.length === 0) {
      this.getData(p);
    } else {
      this.getData(p, keyword);
    }
  };

  handleChangeSort = (type = "newest") => {
    this.setState({ loading: true });
    this.sortData(this.state.posts, type);
    this.sortData(this.state.modifiedPosts, type);

    this.setState({
      sort: type,
      posts: JSON.parse(JSON.stringify(this.state.posts)),
      modifiedPosts: JSON.parse(JSON.stringify(this.state.modifiedPosts)),
      loading: false,
    });
    this.setState({ loading: false });
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
          getPostDetail: this.getPostDetail,
          editPost: this.handleEditPost,
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
