import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  // const url =
  //   import.meta.env.MODE == "development"
  //     ? console.log(import.meta.env.VITE_LOCAL_URL)
  //     : console.log(import.meta.env.VITE_PROD_URL, "HERE");

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <AllRoutes colorMode={colorMode} toggleColorMode={toggleColorMode} />
    </Box>
  );
}

export default App;
