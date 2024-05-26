import React from "react";
import { Routes, Route } from "react-router-dom";
import Resetpassword from "../Pages/Resetpassword";
import SignIn from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Forgotpasword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import Header from "../components/Header";
import CreateEmployee from "../Pages/Admin pages/CreateEmployee";
import EmployeeList from "../Pages/Admin pages/EmployeeList";
import TaskList from "../Pages/Admin pages/TaskList";
import AssignedTaskList from "../Pages/Employee Pages/Employee-task";
import AdminHome from "../Pages/Admin pages/Admin-Home";
import EmployeeHome from "../Pages/Employee Pages/Employee-Home";
import EditEmployee from "../Pages/Admin pages/EditEmployee";

export const AppRouters = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Signup />
          </>
        }
      />
      <Route
        path="/resetpassword"
        element={
          <>
            <Resetpassword />
          </>
        }
      />
      <Route
        path="/Forgotpassword"
        element={
          <>
            <Forgotpasword />
          </>
        }
      />
      <Route
        path="/Home"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
      <Route
        path="/CreateEmployee"
        element={
          <>
            <Header />
            <CreateEmployee />
          </>
        }
      />
 <Route
        path="/EmployeeList"
        element={
          <>
            <Header />
            <EmployeeList />
          </>
        }
      />

<Route
        path="/tasks/:email"
        element={
          <>
            <Header />
            <TaskList />
          </>
        }
      />

      <Route
        path="/userTask:email"
        element={
          <>
            <Header />
            < AssignedTaskList/>
          </>
        }
      />
      
     
      <Route
        path="/Admindash"
        element={
          <>
            <Header />
            < AdminHome/>
          </>
        }
      />
        <Route
        path="/userdash"
        element={
          <>
            <Header />
            < EmployeeHome/>
          </>
        }
      />
         {/* <Route
        path="/Edit/:userId"
        element={
          <>
            <Header />
            <EditEmployee/>
          </>
        }
      /> */}


    </Routes>
    
  );
};

export default AppRouters;
