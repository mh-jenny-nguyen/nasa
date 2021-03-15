import React from "react";
import { ReactComponent as HeartIcon } from "../../assets/img/heart-solid.svg";
import { ReactComponent as TrashIcon } from "../../assets/img/trash-solid.svg";
import { ReactComponent as EditIcon } from "../../assets/img/pencil-alt-solid.svg";
import { ReactComponent as RestoreIcon } from "../../assets/img/trash-restore-solid.svg";
import { truncateWithEllipsis, dateFormat } from "../../helper";
import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";
import "./style.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';

const Card = (props) => {
  const handleClickLikeBtn = (nasa_id) => {
    if (typeof props.onClickLikeBtn === "function") {
      props.onClickLikeBtn(nasa_id, !props.likeState);
    }
  };

  const handleClickRemoveBtn = (nasa_id) => {
    if (typeof props.onClickRemoveBtn === "function") {
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure to delete this item ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              props.onClickRemoveBtn(nasa_id);
            }
          },
          {
            label: 'No',
          }
        ]
      });
    }
  };

  const handleClickUndoBtn = (nasa_id) => {
    if (typeof props.onClickUndoBtn === "function") {
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure to restore this item',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              props.onClickUndoBtn(nasa_id);
            }
          },
          {
            label: 'No',
          }
        ]
      });
    }
  };

  return (
    <div className="card">
      <div className="card__img-wrap">
        <img
          alt="This is Card Avatar"
          className="card__img"
          src={props.href}
          style={{ display: "block", width: "100%" }}
        />
      </div>
      <div className="card__detail">
        <div className="card__location">{truncateWithEllipsis(props.location, 30)}</div>
        <div className="card__control">
          {props.showEditBtn && (
            <Link
              className="card__btn--edit card__btn"
              to={`/EditPage/${props.cardId}`}
            >
              <EditIcon />
            </Link>
          )}

          {props.showRemoveBtn && (
            <button
              data-id={props.cardId}
              className="card__btn--remove card__btn"
              type="button"
              title="Remove"
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
