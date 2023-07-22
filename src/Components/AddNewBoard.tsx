import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddBoardModal from "./AddBoardModal";

const AddNewBoard = () => {
  const {
    isOpen: addBoardIsOpen,
    onOpen: addBoardOnOpen,
    onClose: addBoardOnClose,
  } = useDisclosure();

  return (
    <Box padding={"1.5rem"}>
      <Button onClick={addBoardOnOpen} colorScheme="blue">
        <Flex align={"center"} gap={"0.5rem"}>
          <AddIcon />
          <Box>Add New Board</Box>
        </Flex>
      </Button>
      <AddBoardModal
        addBoardIsOpen={addBoardIsOpen}
        addBoardOnClose={addBoardOnClose}
      />
    </Box>
  );
};

export default AddNewBoard;
