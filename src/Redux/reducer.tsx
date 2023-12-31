import { Action, InitialStateType } from "./Constants";
import { ActionTypes } from "./action-types";

const initialState: InitialStateType = {
  token: localStorage.getItem("token") || "",
  user: "",
  boards: [],
  board: "",
  tasks: [],
  subTasks: [],
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

    case ActionTypes.BOARD_UPDATE: {
      return {
        ...state,
        boards: action.payload,
      };
    }

    case ActionTypes.BOARD_TASKS_SUBTASKS: {
      return {
        ...state,
        board: action.payload.board,
        tasks: action.payload.tasks,
        subTasks: action.payload.subTasks,
      };
    }

    default: {
      return state;
    }
  }
}
