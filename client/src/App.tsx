import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from './components/NavBar';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterUser } from './pages/Register';
import { Presentation } from './components/presentation/Presentation';
import { START } from './features/restaurants/actionTypes';
import { API } from './constants';
import { getRestaurantsState } from './selectors';
import { RestaurantRegister } from './pages/RestaurantRegister'

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
          <Route path="/login" component={LoginPage} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/register" component={RegisterUser} />
          <Route path="/restaurant" component={RestaurantRegister} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
