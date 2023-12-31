import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import AddTaskModal from "./AddTaskModal";
const AddNewTask = () => {
  const {
    isOpen: addTaskIsOpen,
    onOpen: addTaskOnOpen,
    onClose: addTaskOnClose,
  } = useDisclosure();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      padding={{ base: "0 1rem 1rem 1rem", md: "0 1.5rem 1.5rem 1.5rem" }}
    >
      <Flex>
        <Button onClick={addTaskOnOpen} minW={"170px"} colorScheme="blue">
          <Flex align={"center"} justify={"center"} gap={"0.5rem"}>
            <AddIcon />
            <Box>Add New Task</Box>
          </Flex>
        </Button>
      </Flex>
      <Box>
        <AddTaskModal
          addTaskIsOpen={addTaskIsOpen}
          addTaskOnClose={addTaskOnClose}
        />
      </Box>
    </Box>
  );
};

export default AddNewTask;
