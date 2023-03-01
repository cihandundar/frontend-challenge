import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "redux/userSlice";
const UserItem = () => {
  const user = useSelector((state) => state?.usersReducer?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="users">
      <div className="users__container">
        {user?.map((item) => (
          <Link key={item?.id} to={`/user/${item?.id}`}>
            <div className="users__cart">
              <div className="users__cart__title">
                <h4>{item?.title}</h4>
              </div>
              <div className="users__cart__text">
                <p>{item?.body}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserItem;
