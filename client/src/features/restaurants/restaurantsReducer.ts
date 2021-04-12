import { SocialsTypes } from './types';
import { START } from './actionTypes';
import {Restaurant} from "../../../../server/src/interfaces/restaurant.interface";

const initialState: Restaurant[] = [];

export default (state = initialState, action: SocialsTypes) => {
  switch (action.type) {
    case START:
      debugger
      return action.payload;
    default:
      return state;
  }
};
