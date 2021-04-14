import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Presentation } from './components/presentation/Presentation'
import {NavBar} from "./components/NavBar";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {START} from "./features/restaurants/actionTypes";
import {API} from "./constants";
import {getRestaurantsState} from "./selectors";

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
      <Presentation />
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
