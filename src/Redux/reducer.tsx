import { Action, InitialStateType } from "./Constants";
import { ActionTypes } from "./action-types";

const initialState: InitialStateType = {
  token: localStorage.getItem("token") || "",
  user: "",
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.USER_AUTH: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }

    case ActionTypes.USER_LOGOUT: {
      return {
        ...state,
        token: "",
        user: "",
      };
    }

    default: {
      return state;
    }
  }
}
