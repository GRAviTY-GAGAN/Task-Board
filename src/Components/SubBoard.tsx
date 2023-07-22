import {
  Box,
  Button,
  Flex,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../Redux/store";
import { SubTaskType, TasksType } from "../Redux/Constants";
import { useSearchParams } from "react-router-dom";
import SubtaskCount from "./SubtaskCount";
import TaskModal from "./TaskModal";
import axios from "axios";
import { motion } from "framer-motion";
import { DeleteIcon } from "@chakra-ui/icons";
import { Dispatch } from "redux";
import { fetchBoardAndTaskAndSubTask } from "../Redux/action";

const SubBoard = () => {
  const {
    isOpen: taskIsOpen,
    onOpen: taskOnOpen,
    onClose: taskOnClose,
  } = useDisclosure();

  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const tasks = useSelector((store: Store) => store.reducer.tasks);
  const subTasks = useSelector((store: Store) => store.reducer.subTasks);

  const [searchParams] = useSearchParams();
  const toast = useToast();
  const dispatch: Dispatch<any> = useDispatch();

  const [title, setTitle] = useState("");
  const [taskID, setTaskID] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [taskSubTaskID, setTaskSubTaskID] = useState<Array<string>>([]);
  const [subtasks, setSubtasks] = useState<any | Array<SubTaskType>>([]);

  useEffect(() => {
    fetchTask();
  }, [taskSubTaskID]);

  let todos: Array<TasksType> = [];
  let doing: Array<TasksType> = [];
  let done: Array<TasksType> = [];

  filterTaskByStatus();

  function fetchTask() {
    axios
      .post(`${url}/boards/tasksAndSubTasks`, { taskSubTaskID })
      .then((res) => {
        console.log(res);
        setSubtasks(res.data.subTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterTaskByStatus() {
    const filteredTasks = tasks.filter((task) => {
      if (searchParams.get("board") === task.boardID) {
        return true;
      }
      return false;
    });

    let statusTodo: Array<TasksType> = [];
    let statusDoing: Array<TasksType> = [];
    let statusDone: Array<TasksType> = [];

    filteredTasks.forEach((task) => {
      if (task.status == "Todo") {
        statusTodo.push(task);
      } else if (task.status == "Doing") {
        statusDoing.push(task);
      } else if (task.status == "Done") {
        statusDone.push(task);
      }
    });

    todos = statusTodo;
    doing = statusDoing;
    done = statusDone;
  }

  function handleTaskOpen(data: TasksType) {
    setTitle(data.title);
    setDesc(data.description);
    setTaskSubTaskID(data.subtask);
    setTaskStatus(data.status);
    setTaskID(data._id);
    taskOnOpen();
  }

  function handleTaskDelete(id: string) {
    axios
      .delete(`${url}/boards/taskDelete/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.msg == "Success Deleted") {
          toast({
            title: "Task Deleted.",
            // description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });

          dispatch(fetchBoardAndTaskAndSubTask(searchParams.get("board")));
        } else {
          toast({
            title: res.data?.msg || "Something went wrong...",
            // description: "We've created your account for you.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message || "Something went wrong...",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  }

  function handleFieldChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    if (e.target.name == "name") {
      setTitle(e.target.value);
    } else if (e.target.name == "description") {
      setDesc(e.target.value);
    } else {
      setTaskStatus(e.target.value);
    }
    console.log(e.target.name == "description", e.target.name == "name");
  }

  return (
    <Grid width={"100%"} gridTemplateColumns={"repeat(3,1fr)"} height={"100vh"}>
      <Box padding={"1rem"}>
        <Box>Todo</Box>
        <Box>
          {todos.map((todo) => {
            return (
              <Box
                bg={"blue.400"}
                borderRadius={"5px"}
                key={todo._id}
                style={{
                  boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <Box
                  padding={"0.5rem"}
                  pb={"0px"}
                  mt={"1rem"}
                  borderRadius={"5px"}
                  bg={"blue.400"}
                  color={"white"}
                  cursor={"pointer"}
                  onClick={() => handleTaskOpen(todo)}
                >
                  <Box>{todo.title}</Box>
                  <Box> - {todo.description}</Box>
                  {subTasks.length > 0 ? (
                    <Box>
                      <SubtaskCount item={todo} subTasks={subTasks} />
                    </Box>
                  ) : (
                    ""
                  )}
                  {/* <TaskModal
                  data={todo}
                  taskOnClose={taskOnClose}
                  taskIsOpen={taskIsOpen}
                /> */}
                </Box>
                <Flex justify={"center"}>
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      border={"none"}
                      onClick={() => handleTaskDelete(todo._id)}
                      w={"150px"}
                      colorScheme={"transparent"}
                      cursor={"pointer"}
                      _hover={{ border: "none" }}
                      _focus={{ outline: "transparent" }}
                    >
                      <DeleteIcon color={"#1A202C"} />
                    </Button>
                  </motion.div>
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box padding={"1rem"}>
        <Box>Doing</Box>
        <Box>
          {doing.map((item) => {
            return (
              <Box
                bg={"blue.400"}
                borderRadius={"5px"}
                key={item._id}
                style={{
                  boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <Box
                  padding={"0.5rem"}
                  pb={"0px"}
                  mt={"1rem"}
                  borderRadius={"5px"}
                  bg={"blue.400"}
                  color={"white"}
                  cursor={"pointer"}
                  onClick={() => handleTaskOpen(item)}
                >
                  <Box>{item.title}</Box>
                  <Box> - {item.description}</Box>
                  {subTasks.length > 0 ? (
                    <Box>
                      <SubtaskCount item={item} subTasks={subTasks} />
                    </Box>
                  ) : (
                    ""
                  )}
                  {/* <TaskModal
                  data={item}
                  taskOnClose={taskOnClose}
                  taskIsOpen={taskIsOpen}
                /> */}
                </Box>
                <Flex justify={"center"}>
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      border={"none"}
                      onClick={() => handleTaskDelete(item._id)}
                      w={"150px"}
                      colorScheme={"transparent"}
                      cursor={"pointer"}
                      _hover={{ border: "none" }}
                      _focus={{ outline: "transparent" }}
                    >
                      <DeleteIcon color={"#1A202C"} />
                    </Button>
                  </motion.div>
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box padding={"1rem"}>
        <Box>Done</Box>
        <Box>
          {done.map((item) => {
            return (
              <Box
                bg={"blue.400"}
                borderRadius={"5px"}
                key={item._id}
                style={{
                  boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <Box
                  padding={"0.5rem"}
                  pb={"0px"}
                  mt={"1rem"}
                  color={"white"}
                  cursor={"pointer"}
                  onClick={() => handleTaskOpen(item)}
                >
                  <Box>{item.title}</Box>
                  <Box> - {item.description}</Box>
                  {subTasks.length > 0 ? (
                    <Box>
                      <SubtaskCount item={item} subTasks={subTasks} />
                    </Box>
                  ) : (
                    ""
                  )}

                  {/* <TaskModal
                  data={item}
                  taskOnClose={taskOnClose}
                  taskIsOpen={taskIsOpen}
                /> */}
                </Box>
                <Flex justify={"center"}>
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      border={"none"}
                      w={"150px"}
                      colorScheme={"transparent"}
                      onClick={() => handleTaskDelete(item._id)}
                      cursor={"pointer"}
                      _hover={{ border: "none" }}
                      _focus={{ outline: "transparent" }}
                    >
                      <DeleteIcon color={"#1A202C"} />
                    </Button>
                  </motion.div>
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Box>
      <TaskModal
        title={title}
        handleFieldChange={handleFieldChange}
        desc={desc}
        taskID={taskID}
        taskStatus={taskStatus}
        subtasks={subtasks}
        taskOnClose={taskOnClose}
        taskIsOpen={taskIsOpen}
        fetchTask={fetchTask}
      />
    </Grid>
  );
};

export default SubBoard;
