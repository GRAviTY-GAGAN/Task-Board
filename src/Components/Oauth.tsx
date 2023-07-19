import axios from "axios";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface OauthProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Oauth = ({ setLoading }: OauthProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  function successful(res: any) {
    setLoading(true);
    // console.log(jwtDecode(res.credential));
    // toast({
    //   title: "Account created.",
    //   description: "We've created your account for you.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    //   position: "top",
    // });
    gAuthSignin(jwtDecode(res.credential));
  }

  const url =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PROD_URL;

  function gAuthSignin(data: any) {
    axios
      .post(`${url}/user/gAuth`, data)
      .then((res) => {
        // console.log(res);
        if (res.data.msg == "User Logged In.") {
          localStorage.setItem("token", res.data.token);
          toast({
            title: res.data.msg,
            // description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          navigate("/home");
        } else {
          console.log(res);
          toast({
            title: "Login Failed.",
            // description: "We've created your account for you.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Login Failed.",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => {
        setLoading(false);
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
