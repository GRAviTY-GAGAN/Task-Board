import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { Store } from "./store";
import { Action } from "./Constants";
import { ActionTypes } from "./action-types";

const url =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_PROD_URL;

export const fetchBoardsData =
  () => (dispatch: ThunkDispatch<Store, {}, Action>) => {
    axios
      .get(`${url}/boards/`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.msg == "yes") {
          dispatch({
            type: ActionTypes.BOARD_UPDATE,
            payload: res.data.boards,
          });
          // dispatch(fetchBoardAndTaskAndSubTask(id));
        } else {
          console.error(res, "SOmething wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const fetchBoardAndTaskAndSubTask =
  (id: string | null) => (dispatch: ThunkDispatch<Store, {}, Action>) => {
    if (id) {
      return axios
        .get(`${url}/boards/newTasksFetch/${id}`)
        .then((res) => {
          // console.log(res);
          dispatch({
            type: ActionTypes.BOARD_TASKS_SUBTASKS,
            payload: {
              board: res.data.board,
              tasks: res.data.tasks,
              subTasks: res.data.subTasks,
            },
          });
          // console.log(Date.now());
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ActionTypes.BOARD_TASKS_SUBTASKS,
            payload: {
              board: "",
              tasks: [],
              subTasks: [],
            },
          });
        });
    }
  };
