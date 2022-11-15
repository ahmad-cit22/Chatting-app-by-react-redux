import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";

const ChatField = () => {
  const activeChatData = useSelector((state) => state.activeChatInfo.value);

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
      <div>
        <div className="flex flex-col items-start justify-center">
          <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 xl:mt-14 text-sm md:text-[15px] text-black font-semibold rounded-md w-[65%] m-auto">
            Hello Friend!
          </p>
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
