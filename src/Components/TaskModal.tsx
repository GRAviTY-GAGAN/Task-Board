import {
  Box,
  Button,
  Checkbox,
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
import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { fetchBoardAndTaskAndSubTask, fetchBoardsData } from "../Redux/action";
import { SubTaskType } from "../Redux/Constants";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface TaskModalPropsTypes {
  taskIsOpen: boolean;
  taskOnClose: () => void;
  fetchTask: () => void;
  title: string;
  desc: string;
  taskID: string;
  taskStatus: string;
  subtasks: [SubTaskType];
  handleFieldChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function TaskModal({
  taskIsOpen,
  taskOnClose,
  title,
  handleFieldChange,
  fetchTask,
  desc,
  subtasks,
  taskID,
  taskStatus,
}: TaskModalPropsTypes) {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const dispatch: Dispatch<any> = useDispatch();
  const toast = useToast();
  const location = useLocation();

  function handleSaveBoard() {
    if (title) {
      axios
        .patch(`${url}/boards/task/${taskID}`, {
          title,
          description: desc,
          status: taskStatus,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.msg == "Task updated") {
            toast({
              title: "Task Updated.",
              // description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            dispatch(fetchBoardsData());
            dispatch(
              fetchBoardAndTaskAndSubTask(location.search.split("=")[1])
            );
          } else {
            toast({
              title: res.data?.msg || "Something went wrong try again.",
              // description: "We've created your account for you.",
              status: "warning",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
          taskOnClose();
          // fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
        });
    } else {
      toast({
        title: "Please give a name",
        // description: "We've created your account for you.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  //   console.log(taskStatus, title);

  function handleSubtaskChange(id: string, status: boolean) {
    axios
      .patch(`${url}/boards/subtaskUpdate/${id}`, { status: !status })
      .then(() => {
        // console.log(res);
        fetchTask();
        dispatch(fetchBoardsData());
        dispatch(fetchBoardAndTaskAndSubTask(location.search.split("=")[1]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={taskIsOpen}
        onClose={taskOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={title}
                onChange={handleFieldChange}
                ref={initialRef}
                placeholder="Task name"
              />
            </FormControl>
          </ModalBody>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={desc}
                onChange={handleFieldChange}
                ref={initialRef}
                placeholder="Task description"
              />
            </FormControl>
          </ModalBody>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Subtasks</FormLabel>
              {subtasks.length > 0 ? (
                <Box>
                  {subtasks.map((subtask) => (
                    <Checkbox
                      onChange={() =>
                        handleSubtaskChange(subtask._id, subtask.status)
                      }
                      key={subtask._id}
                      display={"flex"}
                      colorScheme="green"
                      defaultChecked={subtask.status}
                    >
                      {subtask.task}
                    </Checkbox>
                  ))}
                </Box>
              ) : (
                <Box>No Subtasks Found.</Box>
              )}
            </FormControl>
          </ModalBody>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select defaultValue={taskStatus} onChange={handleFieldChange}>
                {/* <option value={status}>{status}</option> */}
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBoard} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={taskOnClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
