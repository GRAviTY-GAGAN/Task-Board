import { Dispatch, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../Redux/action-types";
import Sidebar from "../Components/Sidebar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Board from "../Components/Board";
import { fetchBoardsData } from "../Redux/action";
import "../CSS/Home.css";

const Home = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const dispatch: Dispatch<any> = useDispatch();

  // const [active, setActive] = useState(false);

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
          dispatch(fetchBoardsData());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box bg={useColorModeValue("white", "#0d1117")}>
      <Flex>
        <Box
          className={show ? "home__sidebarCont active" : "home__sidebarCont"}
          width={{ base: "55%", md: "30%", lg: "20%" }}
        >
          <Sidebar setShow={setShow} />
        </Box>
        <Box width={{ base: "100%", lg: "80%" }}>
          <Board />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
