import axios from 'axios';
import { useDispatch } from 'react-redux';

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
      <Presentation />
      <Slider />
      <Socials />
    </BrowserRouter>
  );
};

export default App;
