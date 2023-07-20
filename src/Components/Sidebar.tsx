import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AddNewBoard from "./AddNewBoard";

const Sidebar = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "#21262d")} height={"100vh"}>
      <Box padding={"1rem"} minW={"200px"} maxH={"300px"}>
        Sidebar
      </Box>
      <Box
      // style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <AddNewBoard />
      </Box>
    </Box>
  );
};

export default Sidebar;
