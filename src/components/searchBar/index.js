import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

const SearchBar = () => {
  let [focus, setFocus] = useState(false);
  return (
    <div className="w-full relative">
      <FiSearch
        className={`absolute text-[22px] top-[30%] left-6 z-[2] linear duration-300  ${
          focus ? "text-primaryTwo" : " text-black/60"
        }`}
      />
      <input
        className={`w-full py-4 pl-[70px] pr-14 rounded-lg drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] outline-none`}
        placeholder="Search Here"
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      <HiOutlineDotsVertical className="absolute text-[22px] top-[30%] right-4 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
