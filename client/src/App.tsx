import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Navbar } from './components/NavBar';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterUser } from './pages/Register';
import { Logout } from './pages/Logout';
import { Presentation } from './components/presentation/Presentation';
import { START } from './features/restaurants/actionTypes';
import { API } from './constants';
import { getRestaurantsState } from './selectors';
import { RestaurantRegister } from './pages/RestaurantRegister'
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Presentation } from './components/presentation/Presentation';
import { START } from './features/restaurants/actionTypes';
import { API } from './constants';
import Slider from './components/slider';
import Socials from './components/socials';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/presentation" component={Presentation} />
          <Route path="/register" component={RegisterUser} />
          <Route path="/restaurant" component={RestaurantRegister} />
        </Switch>
      </div>
      <Presentation />
      <Slider />
      <Socials />
    </BrowserRouter>
  );
};

export default App;
