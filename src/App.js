import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Home from "./pages/home";
import Messages from "./pages/messages";

const App = () => {
  return (
    <Routes>
      <Route path={"/registration"} element={<Registration />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<Home />} />
      <Route path={"/messages"} element={<Messages />} />
    </Routes>
  );
};

export default App;
