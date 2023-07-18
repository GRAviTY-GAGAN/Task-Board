import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

const Oauth = () => {
  const toast = useToast();

  function successful(res: any) {
    console.log(jwtDecode(res.credential));
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  function onFailure() {
    console.error("Login Failed");
    toast({
      title: "Login Failed.",
      // description: "We've created your account for you.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={(res) => {
          successful(res);
        }}
        onError={onFailure}
      />
    </div>
  );
};

export default Oauth;
