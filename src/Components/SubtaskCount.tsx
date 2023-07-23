import { SubTaskType, TasksType } from "../Redux/Constants";
import { Box } from "@chakra-ui/react";

interface SubTaskCountPropsType {
  item: TasksType;
  subTasks: [] | [SubTaskType];
}

const SubtaskCount = ({ item, subTasks }: SubTaskCountPropsType) => {
  let countTrack = 0;

  for (let i = 0; i < item.subtask.length; i++) {
    for (let j = 0; j < subTasks.length; j++) {
      if (item.subtask[i] == subTasks[j].subTaskID) {
        if (subTasks[j].status == false) {
          countTrack++;
          break;
        }
      }
    }
  }

  //   setCount(countTrack);

  console.log(countTrack, "countTrack");

  return (
    <Box>
      {item.subtask.length ? (
        <Box>
          {countTrack == 0
            ? "All Sub tasks Completed"
            : `${countTrack} of ${item.subtask.length} Sub tasks pending.`}
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SubtaskCount;
