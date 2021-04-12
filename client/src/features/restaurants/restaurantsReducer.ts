import { SocialsTypes } from './types';
import { START } from './actionTypes';

const initialState = {
  value: 0,
};

export default (state = initialState, action: SocialsTypes) => {
  switch (action.type) {
    case START:
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
};
