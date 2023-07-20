import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Board = () => {
  return (
    <Grid
      width={"100%"}
      gridTemplateColumns={"repeat(3,1fr)"}
      height={"100vh"}
      bg={useColorModeValue("white", "#1A202C")}
    >
      <Box padding={"1rem"}> Todo</Box>
      <Box padding={"1rem"}> Doing</Box>
      <Box padding={"1rem"}> Done</Box>
    </Grid>
  );
};

export default Board;
