import React from "react";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../../assets/images/profile.jpg";
const Header = () => {
  const user = useSelector((state) => state?.usersReducer?.user);
  const totalPost = user?.length;
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__container">
          <div className="nav__logo">
            <Link to="/">
              <h1>Arbit Blog</h1>
            </Link>
          </div>
          <ul className="nav__list">
            <li className="nav__list__link">
              <Link to="/">
                <span>{totalPost}</span>
                Posts
              </Link>
            </li>
            <li className="nav__list__link">
              <FaBell />
            </li>
            <div className="nav__list__img">
              <img src={Profile} alt="" />
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
