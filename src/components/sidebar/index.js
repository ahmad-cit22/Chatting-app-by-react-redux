import React, { useState } from "react";
import { VscHome } from "react-icons/vsc";
import { TbMessageCircle, TbSettings } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import SidebarMenu from "../sidebarMenu";

const Sidebar = ({ activePage }) => {
  let [active, setActive] = useState(activePage);

  return (
    <div className="w-[12.5%] py-10 bg-primary h-full rounded-[20px] flex flex-col gap-y-[78px]">
      <div className="w-full overflow-hidden gap-y-10 flex flex-col items-center justify-center">
        <picture className="pb-10">
          <img
            src="images/user_avatar.png"
            loading="lazy"
            alt="sidebar_avatar"
          />
        </picture>

        <SidebarMenu
          customClass={`${
            active == "home"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={VscHome}
          goTo={"/"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active == "messages"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbMessageCircle}
          goTo={"/messages"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active == "notifications"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={BsBell}
          goTo={"/"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active == "settings"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbSettings}
          goTo={"/"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active == "settings"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={GoSignOut}
          goTo={"/"}
        ></SidebarMenu>
      </div>
    </div>
  );
};

export default Sidebar;
