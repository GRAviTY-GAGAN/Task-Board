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
import { NavLink, useNavigate } from "react-router-dom";
import { UserObjSignUpType } from "../constants";
import axios from "axios";

const Signup = () => {
  const clientID = import.meta.env.VITE_OauthClientID;

  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  const toast = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSignup() {
    setLoading(true);
    const userObj: UserObjSignUpType = {
      firstName,
      lastName,
      email,
      password,
    };

    if (firstName && email && password) {
      axios
        .post(`${url}/user/signup`, userObj)
        .then((res) => {
          // console.log(res);
          if (res.data.msg == "success") {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
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

            if (res.data?.msg === "User Already Exists.") {
              setTimeout(() => {
                navigate("/signin");
              }, 1500);
            }
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
      setLoading(false);
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
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                      />
                    </FormControl>
                  </Box>
                </HStack>
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
                    Already a user?{" "}
                    <Text display={"inline"} color={"blue.400"}>
                      <NavLink to={"/signin"}>Login</NavLink>
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

export default Signup;
