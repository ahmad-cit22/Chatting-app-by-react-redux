import React from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ goTo, customClass, Icon }) => {
  return (
    <Link
      to={goTo}
      className={`w-full z-10 relative py-[22px] text-[50px] flex justify-center cursor-pointer linear duration-300 after:w-[100%] after:h-full after:absolute after:bg-white after:content-[''] after:top-0 after:left-[14%] after:rounded-tl-[20px] after:rounded-bl-[20px] after:z-[-2] before:w-[22%] before:h-full before:absolute before:bg-primary before:content-[''] before:top-0 before:right-[-17%] before:rounded-tl-[12px] before:rounded-bl-[12px] before:z-[-1] before:shadow-[-2px_0_5px_0_rgba(0,0,0,.30)] ${customClass}`}
    >
      <Icon />
    </Link>
  );
};

export default SidebarMenu;
