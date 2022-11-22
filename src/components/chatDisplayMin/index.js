import React from "react";
import { Link } from "react-router-dom";

const ChatDisplayMin = ({
  avatarPath,
  avatarAlt,
  chatName,
  chatLink,
  message,
  btnText,
  classAvatar,
  classImg,
  classTextBox,
  classChtName,
  classMsg,
  classMsgFooter,
  classBtn,
  classBtnBox,
  classTime,
  subText,
  clickAct,
  disableBtn,
  messageFooter,
  classBtnTwo,
  clickActTwo,
  disableBtnTwo,
  btnTwoText,
  messageBtn,
  clickActMsg,
}) => {
  return (
    <div className="py-[18px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start md:px-4 lg:px-0">
      <Link
        to={""}
        className={`w-[18%] md:w-[12%] lg:w-[15%] xl:w-[17%] ${classAvatar}`}
      >
        <picture
          className={`rounded-full overflow-hidden h-[15vw] md:h-[9vw] lg:h-[5.5vw] xl:h-[4vw] w-[15vw] md:w-[9vw] lg:w-[5.5vw] xl:w-[4vw] border-[0px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
        >
          <img
            src={avatarPath}
            className={"w-full"}
            loading="lazy"
            alt={avatarAlt}
          />
        </picture>
      </Link>
      <div className="flex justify-between w-[82%] md:w-[88%] lg:w-[83%] items-center">
        <div
          className={`w-[55%] md:w-[77%] lg:w-[59%] pr-2 pl-3 ${classTextBox}`}
        >
          <Link to={chatLink}>
            <p
              className={`text-sm md:text-[19px] pb-[1px] lg:text-sm xl:text-[15px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p
            className={`opacity-80 text-[11px] md:text-base lg:text-[11px] xl:text-[13px] truncate ${classMsg}`}
          >
            {message}
          </p>
          <p
            className={`text-[10px] md:text-[15px] lg:text-[10px] xl:text-xs truncate ${classMsgFooter}`}
          >
            {messageFooter}
          </p>
        </div>
        <div
          className={`w-[40%] md:w-[22%] lg:w-[30%] xl:w-[33%] flex flex-col gap-y-1 justify-center items-center font-semibold text-[12px] md:text-base lg:text-[13px] xl:text-[14px] text-white ${classBtnBox}`}
        >
          <button
            className={`w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-1 py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtn}`}
            onClick={messageBtn ? clickActMsg : clickAct}
            disabled={disableBtn}
          >
            {btnText}
          </button>
          <button
            className={`w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-1 py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtnTwo}`}
            onClick={clickActTwo}
            disabled={disableBtnTwo}
          >
            {btnTwoText}
          </button>
        </div>
        <p
          className={`text-[10px] font-semibold opacity-50 last:justify-self-end ${classTime}`}
        >
          {subText}
        </p>
      </div>
    </div>
  );
};

export default ChatDisplayMin;
