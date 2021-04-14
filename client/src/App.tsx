import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Presentation } from './components/presentation/Presentation';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Home } from './pages/Home';
import { START } from './features/restaurants/actionTypes';
import { API } from './constants';
import { getRestaurantsState } from './selectors';
import { Navbar } from './components/NavBar';

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
      <Navbar isAuth={false} />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
