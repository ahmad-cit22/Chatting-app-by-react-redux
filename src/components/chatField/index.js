import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";

const ChatField = () => {
  const activeChatData = useSelector((state) => state.activeChatInfo.value);
  const userData = useSelector((state) => state.userLoginInfo.userInfo);

  return activeChatData !== null ? (
    <>
      <div className="py-[14px] flex items-center border-b-[.5px] justify-start md:px-4 lg:px-3 shadow-md">
        <Link to={""} className={`w-[15%] md:w-[12.5%] lg:w-[15%] xl:w-[11%]`}>
          <picture
            className={`rounded-full overflow-hidden h-[50px] md:h-[78px] lg:h-[55px] w-[50px] md:w-[78px] lg:w-[55px] border-[0px] border-photoUp flex justify-center items-center bg-white`}
          >
            <img
              src={activeChatData.receiverImg}
              className={"w-full"}
              loading="lazy"
              alt={"activeChat"}
            />
          </picture>
        </Link>
        <div className="flex justify-between w-[84%] md:w-[87%] lg:w-[80%] items-center">
          <div className={`w-[55%] md:w-[77%] lg:w-[59%] pr-2`}>
            <Link to={""}>
              <p
                className={`text-sm md:text-[19px] pb-[1px] lg:text-sm xl:text-[17px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300`}
              >
                {activeChatData.receiverName}
              </p>
            </Link>
            <p
              className={`opacity-80 text-[11px] md:text-base lg:text-[11px] xl:text-[13px] truncate`}
            >
              Active Now
              {/* {activeChatData.receiverEmail
                 ? activeChatData.receiverEmail
                 : activeChatData.receiverTag} */}
            </p>
          </div>
          <div
            className={`flex gap-y-1 xl:gap-x-4 justify-center items-center font-semibold text-[12px] md:text-base lg:text-[13px] xl:text-2xl text-primary`}
          >
            <button
              className={`w-[78%] md:w-full break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
              // onClick={messageBtn ? clickActMsg : clickAct}
              // disabled={disableBtn}
            >
              <BsFillTelephoneFill />
            </button>
            <button
              className={`w-[78%] md:w-full break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
              // onClick={messageBtn ? clickActMsg : clickAct}
              // disabled={disableBtn}
            >
              <BsFillCameraVideoFill />
            </button>
            {/* <button
               className={`w-[78%] md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtnTwo}`}
               onClick={clickActTwo}
               disabled={disableBtnTwo}
             >
               {btnTwoText}
             </button> */}
          </div>
          {/*  <p
             className={`text-[10px] font-semibold opacity-50 last:justify-self-end ${classTime}`}
           >
             {subText}
           </p> */}
        </div>
      </div>
      <div className="h-full flex flex-col justify-end w-full">
        <div className="w-full flex flex-col items-start justify-center gap-y-2 first:mt-3">
          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              Hello Friend!
            </p>
          </div>
          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              How r u?
            </p>
          </div>
          <div className="max-w-[65%] self-end flex items-center justify-center gap-x-2 flex-row-reverse">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                // src={activeChatData.receiverImg}
                src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              Hey! I'm fine. What about you man?
            </p>
          </div>

          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              I'm also good :D
            </p>
          </div>

          <div className="max-w-[65%] self-end flex items-center justify-center gap-x-2 flex-row-reverse">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                // src={activeChatData.receiverImg}
                src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              What r u doing now?
            </p>
          </div>
        </div>
        <div className="flex gap-x-2 items-center justify-center">
          <input className="w-[94%] block py-3 px-5 rounded-full mt-6 border-[1px] border-primary/20 focus:border-photoUp/80 text-[17px] text-primary outline-0 linear duration-300" />
          <MdSend className="w-[6%] text-primary/60 hover:text-primary/90 text-[35px] leading-[15px] mt-6" />
        </div>
      </div>
    </>
  ) : (
    <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 xl:mt-14 text-sm md:text-[15px] text-black font-semibold rounded-md w-[65%] m-auto">
      Select a friend or group to start chatting
    </p>
  );
};

export default ChatField;
