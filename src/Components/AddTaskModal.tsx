import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Subtasks from "./Subtasks";
import { v4 as uuidv4 } from "uuid";
import { SubtaskObjType } from "../constants";
import { useSearchParams } from "react-router-dom";
import { fetchBoardAndTaskAndSubTask } from "../Redux/action";

interface AddTaskModalPropsTypes {
  addTaskIsOpen: boolean;
  addTaskOnClose: () => void;
}

interface taskObjType {
  title: string;
  description: string;
  subTasks: string[];
  boardID: string | null;
  status?: string;
}

export default function AddTaskModal({
  addTaskIsOpen,
  addTaskOnClose,
}: AddTaskModalPropsTypes) {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();
  const toast = useToast();

  const [subtasks, setSubtasks] = useState<Array<SubtaskObjType>>([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function fetchData() {
  //   dispatch(fetchBoardAndTaskAndSubTask(searchParams.get("board")));
  // }

  function handleAddSubTask() {
    const newSubTasks = [...subtasks];

    let subtaskObj: SubtaskObjType = {
      subTaskID: uuidv4(),
      task: "",
      status: false,
    };

    newSubTasks.push(subtaskObj);
    setSubtasks(newSubTasks);
  }

  function handleDeleteTask(id: string) {
    let newSubTasks = [...subtasks];

    newSubTasks = newSubTasks.filter((task) => task.subTaskID != id);

    setSubtasks(newSubTasks);
  }

  function handleInputChange(
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    let newSubTasks = [...subtasks];

    newSubTasks = newSubTasks.map((tasks) => {
      if (tasks.subTaskID == id) {
        tasks.task = e.target.value;
        return tasks;
      }
      return tasks;
    });
    setSubtasks(newSubTasks);
  }

  function handleSaveTask() {
    if (title && description) {
      let subtasksIdArray = subtasks.map((task) => task.subTaskID);

      let taskObj: taskObjType = {
        title,
        description,
        subTasks: subtasksIdArray,
        boardID: searchParams.get("board"),
      };
      status && (taskObj.status = status);
      // console.log(subtasks, "SUBTASKS", taskObj);

      axios
        .post(`${url}/boards/task`, { task: taskObj, subtasks: subtasks })
        .then((res) => {
          console.log(res);

          if (res.data.msg == "Task Added") {
            toast({
              title: "Task Added.",
              // description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            dispatch(fetchBoardAndTaskAndSubTask(searchParams.get("board")));
          }

          addTaskOnClose();
          setSubtasks([]);
          setTitle("");
          setdescription("");
          setstatus("");
        })
        .catch((err) => {
          console.log(err);

          if (err?.response.data.msg == "Board Not Found.") {
            toast({
              title:
                err?.response.data.msg ||
                err.message ||
                "Something went wrong...",
              description:
                "Select a board or add new board and try adding task.",
              status: "info",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          } else {
            toast({
              title:
                err?.response.data.msg ||
                err.message ||
                "Something went wrong...",
              // description: "We've created your account for you.",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .finally(() => {
          addTaskOnClose();
        });
    } else {
      toast({
        title: "Please fill both name and description of task.",
        // description: "We've created your account for you.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={addTaskIsOpen}
        onClose={addTaskOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task name</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                ref={initialRef}
                placeholder="Board name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Add Sub Tasks</FormLabel>
              <Subtasks
                subtasks={subtasks}
                handleAddSubTask={handleAddSubTask}
                handleInputChange={handleInputChange}
                handleDeleteTask={handleDeleteTask}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select onChange={(e) => setstatus(e.target.value)}>
                <option value={""}>Select Status</option>
                <option value={"Todo"}>Todo</option>
                <option value={"Doing"}>Doing</option>
                <option value={"Done"}>Done</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveTask} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={addTaskOnClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
