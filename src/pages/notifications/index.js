import React from "react";
import Sidebar from "../../components/sidebar";

const Notifications = () => {
  return (
    <div className="py-5 px-3 md:py-5 px-3 md:px-6 lg:px-5 flex gap-x-6 h-screen font-pop">
      <Sidebar activePage={"notifications"} />
      <div className="w-4/5">Notifications Page</div>
    </div>
  );
};

export default Notifications;
