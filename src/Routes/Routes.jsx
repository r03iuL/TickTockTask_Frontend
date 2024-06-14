import { createBrowserRouter } from "react-router-dom";
import Layout from './../Layouts/Layouts';
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../Layouts/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Profile from "../Pages/Profile";
import AllTask from './../Componenets/Dashboard/AllTask';
import NewTask from './../Componenets/Dashboard/NewTask';
import EditTask from "../Componenets/Dashboard/EditTask";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
     
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "AllTask",
        element: <AllTask></AllTask>,
      },
      {
        path: "NewTask",
        element: <NewTask></NewTask>,
      },
      {
        path: "editTask/:taskId",
        element: <EditTask></EditTask>,
      },
    ],
  },
]);

export default router;
