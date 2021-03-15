import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.scss';
import { ReactComponent as AngleUpIcon } from "../../assets/img/angle-up-solid.svg";
import { ReactComponent as AngleDownIcon } from "../../assets/img/angle-down-solid.svg"
import { ReactComponent as CheckIcon } from "../../assets/img/check-solid.svg";

function Dropdown(props) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(props.title);
  
  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const selectItem = (item) => {
    const { title, id, key } = item;

    setHeaderTitle(title);
    setIsListOpen(false);
    
    if(typeof props.resetThenSet === 'function') {
        props.resetThenSet(id, key);
    }
  }
  
  return (
    <div className="dropdown">
      <button type="button" className="dropdown__header" onClick={toggleList}>
        <div className="dropdown__header-title">{headerTitle}</div>
        {isListOpen ? <span className="dropdown__icon dropdown__icon--up"><AngleUpIcon  /></span> : <span className="dropdown__icon dropdown__icon--down"><AngleDownIcon /></span>}
      </button>
      {isListOpen && (
        <div role="list" className="dropdown__list">
          {props.list.map((item) => (
            <button
              type="button"
              className="dropdown__list-item"
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.title} {item.selected && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

Dropdown.defaultProps = {
    headerTitle: 'Select an Option',
}

Dropdown.propTypes = {
    list: PropTypes.array.isRequired
}
