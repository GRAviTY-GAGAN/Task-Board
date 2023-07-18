import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import Home from "../Pages/Home";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
