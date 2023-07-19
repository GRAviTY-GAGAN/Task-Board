import { ActionTypes } from "./action-types";

interface USER_AUTH_ACTION {
  type: ActionTypes.USER_AUTH;
  payload: USER_AUTH_ACTION_PAYLOAD_TYPE;
}

interface USER_LOGOUT_ACTION {
  type: ActionTypes.USER_LOGOUT;
}

type USER_AUTH_ACTION_PAYLOAD_TYPE = {
  token: string;
  user: object | any;
};

export type Action = USER_AUTH_ACTION | USER_LOGOUT_ACTION;

export type InitialStateType = {
  token: string;
  user: object | string;
};
