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
  user: any;
};
interface BOARD_UPDATE_ACTION_TYPE {
  type: ActionTypes.BOARD_UPDATE;
  payload: [] | [BoardsType];
}

export type Action =
  | USER_AUTH_ACTION
  | USER_LOGOUT_ACTION
  | BOARD_UPDATE_ACTION_TYPE;

export interface InitialStateType {
  token: string;
  user: any;
  boards: [] | [BoardsType];
}

type BoardsType = {
  _id: string;
  userID: string;
  name: string;
  tasks: [];
};
