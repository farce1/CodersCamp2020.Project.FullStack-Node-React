import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isAuth = !!document.cookie.split('=')[1];
  console.log(document.cookie.split('=')[1]);
  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          Co jemy?
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          {isAuth ? (
            <>
              <li>
                <NavLink to="/favorite">Favorite</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          ) : (
            <li cy-data="home-nav-link">
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
