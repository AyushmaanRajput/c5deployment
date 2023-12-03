import { Routes, Route } from "react-router-dom";
import { Signup } from "../../pages/Signup";
import { Login } from "../../pages/Login";
import { Forum } from "../../pages/Forum";
import { Answer } from "../../pages/Answer";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/forum"
        element={
          <PrivateRoute>
            <Forum />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/answer" element={<Answer />}></Route>
    </Routes>
  );
};
