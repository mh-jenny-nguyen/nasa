import React from "react";
import PageContainer from "../../components/PageContainer";
import "./style.scss";
import { withPostConsumer } from "../../context";
import { useParams } from "react-router-dom";

const EditPage = ({ context }) => {
  const { cardid } = useParams();
  const { getPostDetail, editPost } = context;
  const [data, setData] = React.useState({ title: "", location: "", desc: "" });
  const [initialized, setInitialized] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [msg, setMsg] = React.useState({});

  React.useEffect(() => {
    async function initialization() {
      setInitialized(true);
      let res = await getPostDetail(cardid);

      if (res) {
        setData({ title: res.title, desc: res.desc, location: res.location });
      }
    }

    if (!initialized) {
      initialization();
    }
  }, [initialized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);

    let flag = true;
    Object.values(data).forEach((val) => {
      if (val.length === 0 || !val.trim() || val.length > 2500) {
        flag = false;
      }
    });

    if (flag) {
      let res = editPost(cardid, {
        title: data.title,
        location: data.location,
        desc: data.desc,
      });

      if (res) {
        setMsg({ type: "", content: "Data has been saved successfully" });
      } else {
        setMsg({ type: "error", content: "Error! Data not saved" });
      }
    } else {
      setMsg({ type: "error", content: "Error! Invalid Input" });
    }

    setDisabled(false);
  };

  const handleUserInputs = (e) => {
    let temp = { [e.target.name]: e.target.value };
    setData({ ...data, ...temp });
  };

  return (
    <PageContainer>
      <div className="form">
        <form className="form__wrapper" onSubmit={(e) => handleSubmit(e)}>
          <div className="form__heading">Edit</div>
          <div className="form__row">
            <label className="form__lbl" htmlFor="title">
              Title:
            </label>
            <input
              className="form__input"
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={(e) => {
                handleUserInputs(e);
              }}
            />
          </div>
          <div className="form__row">
            <label className="form__lbl" htmlFor="location">
              Location:
            </label>
            <input
              className="form__input"
              type="text"
              id="location"
              name="location"
              value={data.location}
              onChange={(e) => {
                handleUserInputs(e);
              }}
            />
          </div>
          <div className="form__row">
            <label className="form__lbl" htmlFor="desc">
              Description:
            </label>
            <textarea
              row="5"
              className="form__input"
              id="desc"
              name="desc"
              value={data.desc}
              onChange={(e) => {
                handleUserInputs(e);
              }}
            ></textarea>
          </div>
          <div className="form__row">
            <input
              type="submit"
              className="form__submit"
              value="Submit"
              disabled={disabled}
            />
          </div>
        </form>
        {msg?.content?.length > 0 && (
          <div
            className={`form__msg ${
              msg.type === "error" ? "form__msg--error" : ""
            }`}
          >
            {msg.content}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default withPostConsumer(EditPage);
