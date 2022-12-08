import React from "react";
import Sidebar from "../../components/sidebar";

const Settings = () => {
  return (
    <div className="py-5 px-3 md:py-5 px-3 md:px-6 lg:px-5 flex gap-x-6 h-screen font-pop">
      <Sidebar activePage={"settings"} />
      <div className="w-4/5">Settings Page</div>
    </div>
  );
};

export default Settings;
