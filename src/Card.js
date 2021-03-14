import React from "react";
import { ReactComponent as HeartIcon } from "./assets/img/heart-solid.svg";
import { ReactComponent as TrashIcon } from "./assets/img/trash-solid.svg";
import { ReactComponent as EditIcon } from "./assets/img/pencil-alt-solid.svg";
import { ReactComponent as RestoreIcon } from "./assets/img/trash-restore-solid.svg";
import { truncateWithEllipsis } from "./helper.js";
import { Link } from "react-router-dom";
import "./Card.scss";
import { dateFormat } from "./helper";

const Card = (props) => {
  const handleClickLikeBtn = (nasa_id) => {
    if (typeof props.onClickLikeBtn === "function") {
      props.onClickLikeBtn(nasa_id, !props.likeState);
    }
  };

  const handleClickRemoveBtn = (nasa_id) => {
    if (typeof props.onClickRemoveBtn === "function") {
      props.onClickRemoveBtn(nasa_id);
    }
  };

  const handleClickUndoBtn = (nasa_id) => {
    if (typeof props.onClickUndoBtn === "function") {
      props.onClickUndoBtn(nasa_id);
    }
  }

  return (
    <div className="card">
      <img
        className="card__img"
        src={props.href}
        style={{ display: "block", width: "100%" }}
      />
      <div className="card__detail">
        <div className="card__location">{props.location}</div>
        <div className="card__control">
          {props.showEditBtn && (
            <Link
              className="card__btn--edit card__btn"
              to={`/edit/${props.cardId}`}
            >
              <EditIcon />
            </Link>
          )}

          {props.showRemoveBtn && (
            <button
              data-id={props.cardId}
              className="card__btn--remove card__btn"
              type="button"
              title="Remove photo"
              onClick={(e) => {
                handleClickRemoveBtn(e.target.getAttribute("data-id"));
              }}
            >
              <TrashIcon />
            </button>
          )}
          {props.showUndoBtn && (
            <button
              data-id={props.cardId}
              className="card__btn--undo card__btn"
              type="button"
              title="Undo"
              onClick={(e) => {
                handleClickUndoBtn(e.target.getAttribute("data-id"));
              }}
            >
              <RestoreIcon />
            </button>
          )}

          {props.showLikeBtn && (
            <button
              data-id={props.cardId}
              className={`card__btn--like card__btn ${
                props.likeState ? "card__btn--like-up" : ""
              }`}
              type="button"
              title="Like photo"
              width="30"
              height="30"
              onClick={(e) => {
                handleClickLikeBtn(e.target.getAttribute("data-id"));
              }}
            >
              <HeartIcon />
            </button>
          )}
        </div>
        <div className="card__desc">
          <p>{truncateWithEllipsis(props.desc, 40)}</p>

          {props.dateCreated && (
            <p style={{ fontStyle: "italic" }}>
              {dateFormat(props.dateCreated)}
            </p>
          )}
        </div>
      </div>
      <div className="card__title">{truncateWithEllipsis(props.title, 40)}</div>
    </div>
  );
};

export default Card;

Card.defaultProps = {
  likeState: false,
  showLikeBtn: true,
  showRemoveBtn: true,
  showEditBtn: true,
  showUndoBtn: false,
};
