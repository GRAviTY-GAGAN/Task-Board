import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, useState, useEffect } from "react";
import AddNewBoard from "./AddNewBoard";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../Redux/store";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { fetchBoardAndTaskAndSubTask, fetchBoardsData } from "../Redux/action";
import AddNewTask from "./AddNewTask";
import { useLocation, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const toast = useToast();
  const location = useLocation();

  const boards = useSelector((store: Store) => store.reducer.boards);
  const dispatch: Dispatch<any> = useDispatch();
  const [active, setActive] = useState(boards[0]?._id || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const [boardIdUrl, setBoardIdUrl] = useState(searchParams.get("board") || "");

  useEffect(() => {
    const params: { board?: string | undefined } = {};
    boardIdUrl && (params.board = boardIdUrl);

    setActive(boardIdUrl);
    setSearchParams(params);
    // fetchData(location.search.split("=")[1]);
  }, [boards, boardIdUrl]);

  // function fetchData(id: string) {
  //   dispatch(fetchBoardAndTaskAndSubTask(id));
  // }

  function handleDeleteBoard(id: string) {
    axios
      .delete(`${url}/boards/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);

        if (res.data.msg == "Board Deleted with all its tasks and subtasks.") {
          searchParams.delete("board");
          setSearchParams({});
          dispatch(fetchBoardsData());
          dispatch(fetchBoardAndTaskAndSubTask(location.search.split("=")[1]));
          toast({
            title: "Board Deleted.",
            // description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
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
          title: err?.message || "Something went wrong...",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  }

  function handleChangeBoard(id: string) {
    setActive(id);
    setBoardIdUrl(id);
  }

  return (
    <Box bg={useColorModeValue("gray.50", "#21262d")} height={"100vh"}>
      {boards.length > 0 && (
        <Box minW={"200px"} maxH={"300px"}>
          {boards.map((board) => {
            return (
              <Flex
                bg={active == board._id ? "blue.700" : ""}
                color={active == board._id ? "white" : ""}
                onClick={() => handleChangeBoard(board._id)}
                align={"center"}
                justify={"space-between"}
                padding={"1rem"}
                style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                key={board._id}
              >
                <Box>{board.name}</Box>
                <Box
                  onClick={() => handleDeleteBoard(board._id)}
                  cursor={"pointer"}
                >
                  <DeleteIcon color={"red"} />
                </Box>
              </Flex>
            );
          })}
        </Box>
      )}
      <Box>
        <AddNewBoard />
      </Box>
      <Box>
        <AddNewTask />
      </Box>
    </Box>
  );
};

export default Sidebar;
