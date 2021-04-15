import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isAuth = !!document.cookie.split('=')[1];
  console.log(document.cookie.split('=')[1]);
  return (
    <nav>
      <div className="nav-wrapper orange px1">
        <NavLink to="/" className="brand-logo">
          Co jemy?
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/" />
          </li>
          {isAuth ? (
            <>
              <li>
                <NavLink to="/restaurant">Dodaj restaurację</NavLink>
              </li>
              <li>
                <NavLink to="/favorite">Ulubione</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Wyloguj</NavLink>
              </li>
            </>
          ) : (
            <li cy-data="home-nav-link">
              <NavLink to="/login">Zaloguj</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
