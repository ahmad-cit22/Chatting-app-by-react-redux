import React from "react";
import { VscHome } from "react-icons/vsc";
import { TbMessageCircle, TbSettings } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import SidebarMenu from "../sidebarMenu";

const Sidebar = ({ activePage }) => {
  let active = activePage;

  return (
    <div className="w-[13%] py-10 bg-primary h-full rounded-lg flex flex-col gap-y-[78px]">
      <div className="w-full overflow-hidden gap-y-8 flex flex-col items-center justify-start">
        <picture className="pb-10">
          <img
            src="images/user_avatar.png"
            loading="lazy"
            alt="sidebar_avatar"
          />
        </picture>

        <SidebarMenu
          customClass={`${
            active === "home"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={VscHome}
          goTo={"/"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "messages"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbMessageCircle}
          goTo={"/messages"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "notifications"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={BsBell}
          goTo={"/notifications"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "settings"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbSettings}
          goTo={"/settings"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`!text-[47px] ml-2 mt-28 justify-self-end ${
            active === "signOut"
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
