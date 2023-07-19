import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../Redux/action-types";
import Sidebar from "../Components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import Board from "../Components/Board";

const Home = () => {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  function fetchUserDetails() {
    axios
      .get(`${url}/user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.msg == "success") {
          dispatch({
            type: ActionTypes.USER_AUTH,
            payload: {
              token: localStorage.getItem("token"),
              user: res.data.user,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Flex>
        <Box>
          <Sidebar />
        </Box>
        <Box>
          <Board />
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
