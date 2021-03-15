import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/img/search-solid.svg";

const SearchBar = (props) => {
 
  const handleSubmit = (e) => {
    if(typeof props.onSubmit === "function") {
        props.onSubmit(e);
    }
  }

  const handleChangeKeyword = (val) => {
    if(typeof props.onChangeKeyword === "function") {
        props.onChangeKeyword(val);
    }
  };

  return (
    <form className="fsearch" onSubmit={(e) => handleSubmit(e)}>
      <div className="fsearch__input">
        <input
          type="text"
          placeholder="Search..."
          value={props.keyword}
          onChange={(e) => {
            handleChangeKeyword(e.target.value);
          }}
        />
      </div>
      <button className="fsearch__btn" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
