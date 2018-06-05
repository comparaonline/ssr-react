import { IS_SSR } from 'Redux/actions';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case IS_SSR:
      return action.payload;

    default:
      return state;
  }
};
