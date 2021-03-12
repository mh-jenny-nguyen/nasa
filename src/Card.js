import React from "react";
import { ReactComponent as HeartIcon } from "./assets/img/heart-solid.svg";
import { ReactComponent as TrashIcon } from "./assets/img/trash-solid.svg";
import { ReactComponent as EditIcon } from "./assets/img/pencil-alt-solid.svg";
import { truncateWithEllipsis } from "./helper.js";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card" key={props.id}>
      <img
        className="card__img"
        src={props.href}
        style={{ width: 300 }}
      />
      <div className="card__detail">
        <div className="card__location">{props.location}</div>
        <div className="card__control">
          <button
            className="card__btn-like"
            type="button"
            title="Like photo"
            width="30"
            height="30"
          >
            <HeartIcon />
          </button>
          <Link
            className="card__btn-edit"
            to={`/edit/${props.cardId}`}
          >
            <EditIcon />
          </Link>
          <button
            className="card__btn-remove"
            type="button"
            title="Remove photo"
          >
            <TrashIcon />
          </button>
        </div>
        <div className="card__desc">
          {truncateWithEllipsis(props.desc, 20)}
        </div>
      </div>
      <div className="card__title">
        {truncateWithEllipsis(props.title, 20)}
      </div>
    </div>
  );
};

export default Card;
