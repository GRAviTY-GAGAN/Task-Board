import { Box, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchBoardAndTaskAndSubTask } from "../Redux/action";
import SubBoard from "./SubBoard";

const Board = () => {
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();

  // useEffect(() => {
  //   console.log();
  //   filterTaskByBoard();
  //   filterTaskByStatus();
  // }, [tasks, subTasks, board]);

  useEffect(() => {
    let boardID = location.search.split("=")[1];
    fetchNewBoardData(boardID);
  }, [location.search]);

  function fetchNewBoardData(id: string) {
    dispatch(fetchBoardAndTaskAndSubTask(id));

    // console.log(location);
  }

  return (
    <Box bg={useColorModeValue("white", "#1A202C")}>
      <SubBoard />
    </Box>
  );
};

export default Board;
