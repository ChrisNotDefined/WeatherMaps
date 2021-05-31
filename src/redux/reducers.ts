import { AUTH_CHANGED, LOADED_DATA, LOADED_PLACES, LOADING_DATA } from "./actionTypes";
export interface Place {
  name: string;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface IRState {
  loggedInID: string | null;
  places?: Place[];
  isLoading: boolean
}

const initialState: IRState = {
  loggedInID: null,
  isLoading: false,
};

export const loginReducer = (
  state: IRState = initialState,
  action: ReduxAction
): IRState => {

  if(action.type === LOADING_DATA) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === AUTH_CHANGED) {
    return {
      ...state,
      loggedInID: action.payload,
      isLoading: false
    };
  }

  if (action.type === LOADED_PLACES) {
    return {
      ...state,
      places: action.payload,
      isLoading: false
    };
  }

  if(action.type === LOADED_DATA) {
    return {
      ...state,
      isLoading: false
    }
  }

  return state;
};
