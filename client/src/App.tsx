import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar } from './components/NavBar';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { getRestaurantsState } from './selectors';
import { API } from './constants';
import { START } from './features/restaurants/actionTypes';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurantsState);
  console.log('restaurants: ', restaurants);
  useEffect(() => {
    console.log('fecz!! from: ' ,API.endpoints.restaurants.getAllRestaurants());
    axios.get(API.endpoints.restaurants.getAllRestaurants()).then(res => {
      dispatch({
        type: START,
        payload: res.data,
      });
    });
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
