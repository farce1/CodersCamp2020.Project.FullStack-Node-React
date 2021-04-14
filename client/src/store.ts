import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {RestaurantsReducer} from "./features/restaurants";

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  restaurants: RestaurantsReducer
});

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
