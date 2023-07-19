import "../CSS/Signup.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Oauth from "../Components/Oauth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { UserObjType } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const clientID = import.meta.env.VITE_OauthClientID;

  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const toast = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  function handleSignup() {
    const userObj: UserObjType = {
      email,
      password,
    };

    if (email && password) {
      axios
        .post(`${url}/user/login`, userObj)
        .then((res) => {
          console.log(res);
          if (res.data.msg == "success") {
            toast({
              title: "User Logged In.",
              // description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            setTimeout(() => {
              navigate("/home");
            }, 1500);
          } else {
            toast({
              title: res.data?.msg || "Something went wrong...",
              // description: "We've created your account for you.",
              status: "warning",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something went wrong...",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please fill all the required details.",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <div>
      <Box>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Login
              </Heading>
              {/* <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features ✌️
              </Text> */}
            </Stack>
            <Box
              minW={{ base: "320px", md: "400px" }}
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack></HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {!loading ? (
                    <Button
                      onClick={handleSignup}
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  ) : (
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      textAlign={"center"}
                    >
                      <Spinner />
                    </Button>
                  )}
                </Stack>
                <Flex justify={"center"} pt={6}>
                  <div className="Signup__OauthCont">
                    {!loading ? (
                      <GoogleOAuthProvider clientId={clientID}>
                        <Oauth setLoading={setLoading} />
                      </GoogleOAuthProvider>
                    ) : (
                      <Box>
                        <Spinner />
                      </Box>
                    )}
                  </div>
                </Flex>
                <Stack pt={2}>
                  <Text align={"center"}>
                    New user?{" "}
                    <Text display={"inline"} color={"blue.400"}>
                      <NavLink to={"/"}>Signup</NavLink>
                    </Text>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </div>
  );
};

export default Signin;
