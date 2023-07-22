import { SubTaskType, TasksType } from "../Redux/Constants";
import { Box } from "@chakra-ui/react";

interface SubTaskCountPropsType {
  item: TasksType;
  subTasks: [] | [SubTaskType];
}

const SubtaskCount = ({ item, subTasks }: SubTaskCountPropsType) => {
  console.log(item, subTasks, "HERE");

  if (item.title == "Testing Tesk 1") {
    console.log(item, subTasks, "YEs");
  }

  //   const [count, setCount] = useState(0);

  let countTrack = 0;
  //   let ran = false;

  for (let i = 0; i < item.subtask.length; i++) {
    // ran = true;
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
