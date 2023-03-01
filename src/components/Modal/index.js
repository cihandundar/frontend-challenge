import { useState } from "react";
import { closeModal } from "redux/modalSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addNewUser } from "redux/userSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(``);
  const [detail, setDetail] = useState(``);
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    const body = { title, detail };
    e.preventDefault();
    dispatch(addNewUser(body));
    dispatch(closeModal());
    setTimeout(() => {
      // navigate(-1);
    }, 3500);
  };
  return (
    <form onSubmit={handleSubmit} className="details__form">
      <div className="details__form__col">
        <label>Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
        />
      </div>
      <div className="details__form__col">
        <label>Detail</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e?.target?.value)}
          required
        ></textarea>
      </div>
      <div className="details__form__btn">
        <button
          onClick={() => dispatch(closeModal())}
          className="details__form__btn__cancel"
        >
          Cancel
        </button>

        <button className="details__form__btn__update">Submit</button>
      </div>
    </form>
  );
};

export default Modal;
