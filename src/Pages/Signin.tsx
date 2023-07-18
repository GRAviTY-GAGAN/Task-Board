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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

interface UserObjType {
  firstName: string;
  lastName?: string;
  email: string;
  password: string | number;
}

const Signin = () => {
  const clientID = import.meta.env.VITE_OauthClientID;

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSignup() {
    const userObj: UserObjType = {
      firstName,
      lastName,
      email,
      password,
    };

    if (firstName && email && password) {
      console.log(userObj);
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
                </Stack>
                <Flex justify={"center"} pt={6}>
                  <div className="Signup__OauthCont">
                    <GoogleOAuthProvider clientId={clientID}>
                      <Oauth />
                    </GoogleOAuthProvider>
                  </div>
                </Flex>
                <Stack pt={2}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
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
