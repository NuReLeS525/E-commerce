import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../redux/action";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const { isAuthenticated, logout } = useAuthStore();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const closeNavbar = () => setIsCollapsed(true);

  const handleLogout = () => {
    closeNavbar();
    logout();
    dispatch(clearCart());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          Online Shop
        </NavLink>

        <button
          className="navbar-toggler mx-2"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            <>
              <NavLink
                to="/cart"
                className="btn btn-outline-dark m-2 position-relative"
                title="Your cart"
                onClick={closeNavbar}
              >
                <i className="fa fa-cart-shopping mr-1"></i>
                {state.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {state.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/profile"
                    className="btn btn-outline-primary m-2"
                    title="Your profile"
                    onClick={closeNavbar}
                  >
                    <i className="fa fa-user mr-1"></i> Profile
                  </NavLink>
                  <button
                    className="btn btn-outline-dark m-2"
                    title="Logout"
                    onClick={handleLogout}
                  >
                    <i className="fa fa-sign-out-alt mr-1"></i>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark m-2"
                  title="Login to your account"
                  onClick={closeNavbar}
                >
                  <i className="fa fa-sign-in-alt mr-1"></i>
                </NavLink>
              )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar