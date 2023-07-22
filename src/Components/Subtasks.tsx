import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { SubtaskObjType } from "../constants";

interface SubtasksPropsTypes {
  subtasks: SubtaskObjType[];
  handleDeleteTask: (id: string) => void;
  handleInputChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleAddSubTask: () => void;
}

const Subtasks = ({
  subtasks,
  handleDeleteTask,
  handleInputChange,
  handleAddSubTask,
}: SubtasksPropsTypes) => {
  return (
    <Box>
      <Box>
        {subtasks.map((tasks) => (
          <Box mb={"0.5rem"} key={tasks.subTaskID}>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                onChange={(e) => handleInputChange(tasks.subTaskID, e)}
                placeholder="Enter sub task"
              />
              <InputRightElement width="4.5rem">
                <Box
                  mb={"4px"}
                  onClick={() => handleDeleteTask(tasks.subTaskID)}
                  padding={"0px"}
                >
                  <DeleteIcon color={"red.500"} />
                </Box>
              </InputRightElement>
            </InputGroup>
          </Box>
        ))}
      </Box>
      <Button onClick={handleAddSubTask} colorScheme={"blue"} width={"100%"}>
        Add Sub Task
      </Button>
    </Box>
  );
};

export default Subtasks;
