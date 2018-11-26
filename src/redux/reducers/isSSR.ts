import { IS_SSR } from 'Redux/actions';

export interface ISSR {
  readonly isSSR: boolean | object;
};

type Action = {
  type: string;
  payload: boolean;
};

export default (state: object = {}, action: Action): ISSR['isSSR'] => {
  switch (action.type) {
    case IS_SSR:
      return action.payload;

    default:
      return state;
  }
};
