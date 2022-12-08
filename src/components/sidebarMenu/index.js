import React from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ goTo, customClass, Icon, clickAct }) => {
  return (
    <Link
      to={goTo}
      className={`w-full z-10 relative py-[18px] md:py-6 lg:py-[18px] xl:py-[22px] text-[26px] md:text-[42px] lg:text-[32px] xl:text-[45px] flex justify-center cursor-pointer linear duration-300 after:w-[100%] after:md:w-[80%] after:lg:w-[100%] after:h-[3%] after:md:h-[4%] after:lg:h-[85%] after:absolute after:bg-white after:content-[''] after:bottom-0 after:lg:top-[6.5px] after:left-[0%] after:md:left-[10%] after:lg:left-[12%] after:lg:rounded-tl-[20px] after:lg:rounded-bl-[20px] after:z-[-2] before:w-[22%] before:h-[85%] before:absolute before:bg-primary before:content-[''] before:top-[6.5px] before:right-[-17%] before:rounded-tl-[12px] before:rounded-bl-[12px] before:z-[-1] before:shadow-[-2px_0_5px_0_rgba(0,0,0,.30)] before:hidden  ${customClass}`}
    >
      <Icon onClick={clickAct} />
    </Link>
  );
};

export default SidebarMenu;
