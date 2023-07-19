import React from "react";
import { useSelector } from "react-redux";
import { Store } from "./Redux/store";
import { Navigate } from "react-router-dom";

interface ChildrenType {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: ChildrenType) => {
  const auth = useSelector((store: Store) => store.reducer.token);

  if (auth) {
    return children;
  }

  return <Navigate to={"/signin"} />;
};

export default PrivateRoute;
