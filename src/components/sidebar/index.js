import React, { useState } from "react";
import { VscHome } from "react-icons/vsc";
import { TbMessageCircle, TbSettings } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { ImCamera } from "react-icons/im";
import SidebarMenu from "../sidebarMenu";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../button";

const Sidebar = ({ activePage }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  let active = activePage;

  let [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const photoUploadShow = () => {
    setShowModal(true);
  };

  return (
    <div className="w-[13%] py-10 bg-primary h-full rounded-lg flex flex-col gap-y-[78px]">
      <div className="w-full overflow-hidden gap-y-8 flex flex-col items-center justify-start group">
        <div className="pb-10 flex flex-col items-center gap-y-4">
          <picture className="rounded-full relative">
            <img
              width={100}
              src={auth.currentUser.photoURL}
              loading="lazy"
              alt="sidebar_avatar"
            />
            <button
              className="absolute bottom-0 right-0 bg-white rounded-full inline-block p-[6px] border-[2.5px] border-photoUp text-primaryTwo hover:bg-primary hover:text-white linear duration-300 hidden group-hover:block animate-[popUp_.3s_ease_1]"
              onClick={photoUploadShow}
            >
              <ImCamera className=" text-sm" />
            </button>
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
      {/* ========== forgot pass modal starts ========== */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/70 z-10 ${
          showModal ? "block" : "hidden"
        } animate-[smooth.4s_ease_1] grid place-items-center`}
      >
        <div
          className="relative w-2/5 bg-white text-center py-12 px-6 rounded-lg animate-[slideX_.4s_ease_1]"
          // ref={refForgotPass}
        >
          <h2 className="text-primaryTwo text-4xl leading-none  font-bold mb-12">
            Forgot Password?
          </h2>
          <p className="mb-9 font-semibold text-lg text-[#341a91]">
            To reset your password, enter your email address first.
          </p>
          <form className="w-4/5 m-auto">
            <input
              type={"email"}
              className="w-full px-1 py-5 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10 mb-1"
              // onChange={handleForgotEmail}
              placeholder="Email Address"
            />
            {/* {errForgot !== "" && (
              // <p className="pt-1 pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
              <p className="absolute left-[85px] bg-[red]/20 border-2 border-[red] px-2 pb-1 rounded opacity- text-[red]/90 font-semibold animate-[popUp_.4s_ease_1]">
                {errForgot}
              </p>
            )}
            {fErrForgot !== "" && (
              <p className="pt-1 pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                {fErrForgot}
              </p>
            )}
            {successForgot !== "" && (
              <p className="mt-8 px-1 py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-lg font-semibold animate-[popDown_.4s_ease_1]">
                {successForgot}
              </p>
            )}
            <AiOutlineCloseCircle
              className="text-[38px] mr-[6px] mt-[7px] text-primaryTwo/70 hover:text-primaryTwo linear duration-300 rounded-full font-semibold cursor-pointer absolute top-0 right-0"
              onClick={() => {
                setErrForgot("");
                setFErrForgot("");
                setShowForgot(false);
              }}
            /> */}
            <Button
              customClass={
                "py-6 mt-10 w-full text-[22px] rounded-lg font-semibold"
              }
              // text={!loadingForgot && "Next"}
              // btnDisable={loadingForgot}
              // clickAct={handleForgotSubmit}
              // Loader={PulseLoader}
              // loaderColor="#fff"
              // loadingStatus={loadingForgot}
              loaderSize={13}
              loaderMargin={2.5}
            />
          </form>
        </div>
      </div>
      {/* ========== forgot pass modal ends ========== */}
    </div>
  );
};

export default Sidebar;
