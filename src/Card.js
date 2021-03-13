import React from "react";
import { ReactComponent as HeartIcon } from "./assets/img/heart-solid.svg";
import { ReactComponent as TrashIcon } from "./assets/img/trash-solid.svg";
import { ReactComponent as EditIcon } from "./assets/img/pencil-alt-solid.svg";
import { truncateWithEllipsis } from "./helper.js";
import { Link } from "react-router-dom";
import './Card.scss';

const Card = (props) => {
  return (
    <div className="card">
      <img
        className="card__img"
        src={props.href}
        style={{display: "block", width: "100%"}}
      />
      <div className="card__detail">
        <div className="card__location">{props.location}</div>
        <div className="card__control">
          <button
            className="card__btn--like card__btn"
            type="button"
            title="Like photo"
            width="30"
            height="30"
          >
            <HeartIcon />
          </button>
          <Link
            className="card__btn--edit card__btn"
            to={`/edit/${props.cardId}`}
          >
            <EditIcon />
          </Link>
          <button
            className="card__btn--remove card__btn"
            type="button"
            title="Remove photo"
          >
            <TrashIcon />
          </button>
        </div>
        <div className="card__desc">
          <p>{truncateWithEllipsis(props.desc, 40)}</p>
          <p style={{fontStyle: "italic"}}>{props.dateCreated.toDateString('en-GB')}</p>

        </div>
      </div>
      <div className="card__title">
        {truncateWithEllipsis(props.title, 40)}
      </div>
    </div>
  );
};

export default Card;
