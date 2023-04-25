import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  clearDetails,
  fetchUserDetails,
  fetchUserDetailsComments,
  handleDelete,
} from "redux/userSlice";
import { openModal } from "redux/modalSlice";
import { Modal } from "components";
const UserDetails = () => {
  const details = useSelector((state) => state?.usersReducer?.details);
  const comments = useSelector((state) => state?.usersReducer?.comments);
  const { isOpen } = useSelector((store) => store?.modalReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserDetails(id));
    dispatch(fetchUserDetailsComments(id));

    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  const handleDeleteFunc = (id) => {
    dispatch(handleDelete(Number(id)));
    setTimeout(() => {
      navigate("/");
    }, 3500);
  };

  return (
    <div className="details">
      <div className="details__container">
        <div className="details__title">
          <Link to="/">
            <FaArrowLeft />
            <h2>Posts</h2>
          </Link>
          <div className="details__title__btn">
            <button
              className="details__title__btn--newpost"
              onClick={() => dispatch(openModal())}
            >
              + New Post
            </button>
            <button
              className="details__title__btn--delete"
              onClick={() => handleDeleteFunc(id)}
            >
              Delete
            </button>
          </div>
        </div>
        {isOpen && <Modal />}
        <div className="details__container__wrapper">
          <h2>{details?.title}</h2>
          <div className="details__container__wrapper__text">
            <p>{details?.body}</p>
          </div>
        </div>
        <div className="details__comments">
          <div className="details__comments__title">
            <h2>Comments</h2>
          </div>
          {comments?.map((comment) => (
            <div key={comment.id} className="details__comments__cart">
              <div className="details__comments__cart__title">
                <h2>{comment?.name}</h2>
              </div>
              <div className="details__comments__cart__email">
                <p>{comment?.email}</p>
              </div>
              <div className="details__comments__cart__text">
                <p>{comment?.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
