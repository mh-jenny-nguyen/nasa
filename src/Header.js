import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.scss";
import Dropdown from "./Dropdown";
import { ReactComponent as SearchIcon } from "./assets/img/search-solid.svg";
import {withPostConsumer} from './context';

function Header({ context }) {
  const {changeSort} = context;
  const [keyword, setKeyword] = React.useState('');

  const filters = [
    {
      id: 0,
      title: "Newest",
      selected: true,
      key: "newest",
    },
    {
      id: 1,
      title: "Oldest",
      selected: false,
      key: "oldest",
    },
    {
      id: 2,
      title: "Sort A to Z",
      selected: false,
      key: "atoz",
    },
    {
      id: 3,
      title: "Sort Z to A",
      selected: false,
      key: "ztoa",
    },
  ];
  const [filterList, setFilterList] = useState(filters);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/ImageSearchPage",
      search: `?q=${keyword}`,
    });
  };

  const handleChangeKeyWord = (val) => {
    setKeyword(val);
  };

  const handleChangeFilter = (id, key) => {
    const temp = filterList;
    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;
    setFilterList(temp);
    changeSort(key);
  };

  return (
    <nav className="header">
      <div className="header__logo">
        <a href="#home" className="header__logo-txt">
          NASA:IMG
        </a>
      </div>
      <div className="header__tab">
        <ul className="header__tab-wrapper">
          <li className="header__tab-item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__tab-item">
            <Link to="/LikedImagePage">Liked</Link>
          </li>
          <li className="header__tab-item">
            <Link to="/RemovedImagePage">Removed</Link>
          </li>
        </ul>
      </div>
      <div className="header__filter">
        <Dropdown
          title="Newest"
          list={filterList}
          resetThenSet={handleChangeFilter}
        />
      </div>
      <div className="header__search">
        <form className="fsearch" onSubmit={(e) => handleSubmit(e)}>
          <div className="fsearch__input">
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => {
                handleChangeKeyWord(e.target.value);
              }}
            />
          </div>
          <button className="fsearch__btn" type="submit">
            <SearchIcon />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default withPostConsumer(Header);
