import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

const SearchBar = () => {
  return (
    <div className="w-full relative">
      <FiSearch className="absolute text-[22px] top-[30%] left-6 z-[2] text-black/80" />
      <input
        className="w-full py-4 pl-[70px] pr-14 rounded-lg drop-shadow-lg "
        placeholder="Search Here"
      />
      <HiOutlineDotsVertical className="absolute text-[22px] top-[30%] right-4 !text-primaryTwo z-[2] text-black/80" />
    </div>
  );
};

export default SearchBar;
