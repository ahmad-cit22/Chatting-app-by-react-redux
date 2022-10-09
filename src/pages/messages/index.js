import React from "react";
import Sidebar from "../../components/sidebar";

const Messages = () => {
  return (
    <div className="py-8 pl-7 pr-6 flex gap-x-11 h-auto">
      <Sidebar activePage={"messages"} />
      <div className="w-4/5">Message Page</div>
    </div>
  );
};

export default Messages;
