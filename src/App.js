import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Home from "./pages/home";
import Messages from "./pages/messages";
import Settings from "./pages/settings";
import Notifications from "./pages/notifications";

const App = () => {
  return (
    <Routes>
      <Route path={"/registration"} element={<Registration />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<Home />} />
      <Route path={"/messages"} element={<Messages />} />
      <Route path={"/notifications"} element={<Notifications />} />
      <Route path={"/settings"} element={<Settings />} />
    </Routes>
  );
};

export default App;
