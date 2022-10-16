import React from "react";
import { VscHome } from "react-icons/vsc";
import { TbMessageCircle, TbSettings } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import SidebarMenu from "../sidebarMenu";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  let active = activePage;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="w-[13%] py-10 bg-primary h-full rounded-lg flex flex-col gap-y-[78px]">
      <div className="w-full overflow-hidden gap-y-8 flex flex-col items-center justify-start">
        <div className="pb-10 flex flex-col items-center gap-y-4">
          <picture className="rounded-full">
            <img
              width={100}
              src={auth.currentUser.photoURL}
              loading="lazy"
              alt="sidebar_avatar"
            />
          </picture>
          <h3 className="text-white text-xl font-semibold text-center">
            {auth.currentUser.displayName}
          </h3>
        </div>

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
        <button
          className={`w-full z-10 relative py-[22px] text-[50px] flex justify-center cursor-pointer linear duration-300 after:w-[100%] after:h-full after:absolute after:bg-white after:content-[''] after:top-0 after:left-[14%] after:rounded-tl-[20px] after:rounded-bl-[20px] after:z-[-2] before:w-[22%] before:h-full before:absolute before:bg-primary before:content-[''] before:top-0 before:right-[-17%] before:rounded-tl-[12px] before:rounded-bl-[12px] before:z-[-1] before:shadow-[-2px_0_5px_0_rgba(0,0,0,.30)] !text-[47px] ml-2 mt-16 justify-self-end after:hidden before:hidden text-white/70 hover:text-white`}
        >
          <GoSignOut onClick={handleSignOut} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
