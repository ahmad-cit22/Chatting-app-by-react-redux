import React from "react";
import Sidebar from "../../components/sidebar";

const Home = () => {
  return (
    <div className="py-9 pl-8 pr-6 flex gap-x-11 h-auto">
      <Sidebar activePage={"home"} />
      <div className="w-4/5">Main Content</div>
    </div>
  );
};
// w-5/6 bg-white w-full py-[23px] pl-11 pr-16 text-[50px] rounded-tl-[20px] rounded-bl-[20px] text-primary"
export default Home;
