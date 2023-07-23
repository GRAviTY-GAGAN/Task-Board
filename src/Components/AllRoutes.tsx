import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import PrivateRoute from "../PrivateRoute";
import Nav from "./Nav";

const AllRoutes = ({
  colorMode,
  toggleColorMode,
  show,
  setShow,
}: {
  colorMode: string;
  toggleColorMode: () => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Nav colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home show={show} setShow={setShow} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
