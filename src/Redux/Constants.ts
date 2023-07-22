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

interface BOARD_TASKS_SUBTASKS_ACTION_TYPE {
  type: ActionTypes.BOARD_TASKS_SUBTASKS;
  payload: BOARD_TASKS_SUBTASKS_ACTION_PAYLOAD_TYPE;
}

type BOARD_TASKS_SUBTASKS_ACTION_PAYLOAD_TYPE = {
  board: string | BoardsType;
  tasks: [] | [TasksType];
  subTasks: [] | [SubTaskType];
};

export type Action =
  | USER_AUTH_ACTION
  | USER_LOGOUT_ACTION
  | BOARD_UPDATE_ACTION_TYPE
  | BOARD_TASKS_SUBTASKS_ACTION_TYPE;

export interface InitialStateType {
  token: string;
  user: any;
  boards: [] | [BoardsType];
  board: string | BoardsType;
  tasks: [] | [TasksType];
  subTasks: [] | [SubTaskType];
}

export type BoardsType = {
  _id: string;
  userID: string;
  name: string;
  tasks: [];
};

export type TasksType = {
  boardID: string;
  description: string;
  status: string;
  subtask: Array<string>;
  title: string;
  _id: string;
};

export type SubTaskType = {
  subTaskID: string;
  task: string;
  status: boolean;
  _id: string;
};
