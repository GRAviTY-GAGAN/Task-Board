import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardsData } from "../Redux/action";
import { Action } from "../Redux/Constants";

interface AddBoardModalPropsTypes {
  addBoardIsOpen: boolean;
  addBoardOnClose: () => void;
}

export default function AddBoardModal({
  addBoardIsOpen,
  addBoardOnClose,
}: AddBoardModalPropsTypes) {
  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const toast = useToast();

  function handleSaveBoard() {
    if (name) {
      axios
        .post(
          `${url}/boards`,
          { name, tasks: [] },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.msg == "Board Created") {
            toast({
              title: "New Board Added.",
              // description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            dispatch(fetchBoardsData());
          } else {
            toast({
              title: res.data?.msg || "Something went wrong try again.",
              // description: "We've created your account for you.",
              status: "warning",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
          addBoardOnClose();
          // fetchData();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
        });
    } else {
      toast({
        title: "Please give a name",
        // description: "We've created your account for you.",
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={addBoardIsOpen}
        onClose={addBoardOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new board</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Board name</FormLabel>
              <Input
                onChange={(e) => setname(e.target.value)}
                ref={initialRef}
                placeholder="Board name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBoard} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={addBoardOnClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
