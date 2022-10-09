import React from "react";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchBar";

const Home = () => {
  return (
    <div className="py-8 pl-7 pr-6 flex gap-x-11 h-auto font-pop">
      <Sidebar activePage={"home"} />
      <div className="w-[85%] flex gap-y-10 flex-wrap justify-between">
        <div className="w-[35%]">
          <SearchBar />
        </div>
        {/* <div className="w-[36%] bg-black/80">sadas</div>
        <div className="w-[29.5%] bg-black/60">asdasd</div>
        <div className="w-[29.5%] bg-black/60">asdasd</div>
        <div className="w-[36%] bg-black/60">asdasd</div>
        <div className="w-[29.5%] bg-black/60">asdasd</div>
        <div className="w-[29.5%] bg-black/60">asdasd</div> */}
      </div>
    </div>
  );
};
// w-5/6 bg-white w-full py-[23px] pl-11 pr-16 text-[50px] rounded-tl-[20px] rounded-bl-[20px] text-primary"
export default Home;
