import { AUTH_CHANGED } from "./actionTypes";
export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface IRLogin {
  loggedIn: boolean;
}

const initialState: IRLogin = {
  loggedIn: false,
};

export const loginReducer = (
  state: IRLogin = initialState,
  action: ReduxAction
): IRLogin => {
  if (action.type === AUTH_CHANGED) {
    return {
      ...state,
      loggedIn: action.payload,
    };
  }

  return state;
};
