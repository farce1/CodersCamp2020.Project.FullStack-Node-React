import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { CounterReducer } from './features/counter';
import {RestaurantsReducer} from "./features/restaurants";
/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  restaurants: RestaurantsReducer
});

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
