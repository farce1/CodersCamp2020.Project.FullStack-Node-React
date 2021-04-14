import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from './components/NavBar';
import { Home } from './pages/Home';
import Login from './components/login/Login';
import { Logout } from './pages/Logout';
import Register from './components/register/Register';
import { Presentation } from './components/presentation/Presentation';
import { START } from './features/restaurants/actionTypes';
import { API } from './constants';
import { getRestaurantsState } from './selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurantsState);
  console.log('restaurants: ', restaurants);
  useEffect(() => {
    console.log('fecz!! from: ', API.endpoints.restaurants.getAllRestaurants());
    axios.get(API.endpoints.restaurants.getAllRestaurants()).then(res => {
      dispatch({
        type: START,
        payload: res.data,
      });
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
