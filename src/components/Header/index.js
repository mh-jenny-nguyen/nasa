import React, { useState } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import "./style.scss";
import Dropdown from "../Dropdown";
import SearchBar from "../SearchBar";
import {withPostConsumer} from '../../context';
import {filters} from '../../export';

function Header({ context }) {
  const {changeSort} = context;
  const [keyword, setKeyword] = React.useState('');
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
        <Link  to="/" className="header__logo-txt">
          NASA:IMG
        </Link>
      </div>
      <div className="header__tab">
        <ul className="header__tab-wrapper">
          <li className="header__tab-item">
            <NavLink activeClassName='is-active' exact  to="/">Home</NavLink>
          </li>
          <li className="header__tab-item">
            <NavLink activeClassName='is-active' exact  to="/LikedImagePage">Liked</NavLink>
          </li>
          <li className="header__tab-item">
            <NavLink activeClassName='is-active' exact  to="/RemovedImagePage">Removed</NavLink>
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
          <SearchBar onSubmit={handleSubmit} onChangeKeyword={handleChangeKeyWord} keyword={keyword} />
      </div>
    </nav>
  );
}

export default withPostConsumer(Header);
