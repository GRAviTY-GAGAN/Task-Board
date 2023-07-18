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

const Signup = () => {
  const clientID = import.meta.env.VITE_OauthClientID;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="Signup__OauthCont">
        <GoogleOAuthProvider clientId={clientID}>
          <Oauth />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Signup;
