import { Place } from "../models/DatabasePlace";
import {
  AUTH_CHANGED,
  LOADED_DATA,
  LOADED_PLACES,
  LOADING_DATA,
  SET_POSITION,
} from "./actionTypes";

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface IRState {
  loggedInID: string | null;
  places?: Place[];
  isLoading: boolean;
  selectedPosition: google.maps.LatLngLiteral;
}

const initialState: IRState = {
  loggedInID: null,
  isLoading: false,
  selectedPosition: {
    lat: 18.9,
    lng: -99.2,
  },
};

export const loginReducer = (
  state: IRState = initialState,
  action: ReduxAction
): IRState => {
  if (action.type === LOADING_DATA) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === AUTH_CHANGED) {
    return {
      ...state,
      loggedInID: action.payload,
      isLoading: false,
    };
  }

  if (action.type === LOADED_PLACES) {
    return {
      ...state,
      places: action.payload,
      isLoading: false,
    };
  }

  if (action.type === LOADED_DATA) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SET_POSITION) {
    return {
      ...state,
      selectedPosition: action.payload,
    };
  }

  return state;
};
