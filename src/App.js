import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";

const App = () => {
  return (
    <Routes>
      <Route path={"/registration"} element={<Registration />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};

export default App;
