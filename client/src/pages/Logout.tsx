import React, { Fragment } from 'react';
import { useCookies } from 'react-cookie';

export const Logout: React.FC = () => {
  const [cookies, setCookie] = useCookies(['token']);

  const logout = async () => {
    console.log('wylogowanko');
    await fetch('http://localhost:8080/auth/logout', {
      method: 'post',
      headers: {
        Accept: 'Content-Type: application/json',
      },
    }).then(res => {
      console.log(res);
      setCookie('token', '', { path: '/' });
      console.log(cookies);
      window.location.assign('/');
    });
  };

  logout();

  return <Fragment />;
};
