// import { ReactNode } from "react";
import "../CSS/Nav.css";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  //   useDisclosure,
  useColorModeValue,
  Stack,
  //   useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../Redux/action-types";
import { Store } from "../Redux/store";
import colorPic from "../assets/color-mix-pic.avif";
import { useLocation } from "react-router-dom";

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );

export default function Nav({
  colorMode,
  toggleColorMode,
}: {
  colorMode: string;
  toggleColorMode: () => void;
}) {
  //   const { colorMode, toggleColorMode } = useColorMode();
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useSelector((store: Store) => store.reducer.user);
  //   console.log(user.image);

  const dispatch = useDispatch();
  const location = useLocation();

  function handleLogout() {
    localStorage.setItem("token", "");
    dispatch({ type: ActionTypes.USER_LOGOUT });
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            className="nav__TaskBoards"
            cursor={"default"}
            backgroundImage={colorPic}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            backgroundClip={"text"}
            fontSize={{ base: "larger", lg: "3xl" }}
            color={"transparent"}
            fontWeight={800}
          >
            Task Boards
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {location.pathname !== "/" && location.pathname !== "/signin" ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        user.image
                          ? user.image
                          : "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          user.image
                            ? user.image
                            : "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.firstName + " " + user.lastName}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {/* <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                ""
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
