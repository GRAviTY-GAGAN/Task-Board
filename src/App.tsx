import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const [show, setShow] = useState(false);

  // const url =
  //   import.meta.env.MODE == "development"
  //     ? console.log(import.meta.env.VITE_LOCAL_URL)
  //     : console.log(import.meta.env.VITE_PROD_URL, "HERE");

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      {location.pathname != "/" && location.pathname != "/signin" ? (
        <Box
          bg={useColorModeValue("#1A202C", "gray.100")}
          color={useColorModeValue("white", "black")}
          className="hamIcon"
          mt={"1px"}
          onClick={() => setShow(!show)}
        >
          <HamburgerIcon />
        </Box>
      ) : (
        ""
      )}
      <AllRoutes
        show={show}
        setShow={setShow}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />
    </Box>
  );
}

export default App;
