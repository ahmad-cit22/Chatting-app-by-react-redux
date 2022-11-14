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
}) => {
  return (
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none lg:pr-0 justify-between">
      <Link to={""} className={`w-[15%] xl:w-[19%] ${classAvatar}`}>
        <picture
          className={`rounded-full overflow-hidden h-[50px] xl:h-[60px] w-[50px] xl:w-[60px] border-[0px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
        >
          <img
            src={avatarPath}
            className={"w-full"}
            loading="lazy"
            alt={avatarAlt}
          />
        </picture>
      </Link>
      <div className="flex justify-between w-[84%] xl:w-[80%] items-center">
        <div className={`w-[55%] xl:w-[59%] pr-2 ${classTextBox}`}>
          <Link to={chatLink}>
            <p
              className={`text-sm xl:text-[15px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p
            className={`opacity-80 text-[11px] xl:text-xs truncate ${classMsg}`}
          >
            {message}
          </p>
          <p className={`text-[11px] xl:text-xs truncate ${classMsg}`}>
            {messageFooter}
          </p>
        </div>
        <div
          className={`w-[40%] flex flex-col gap-y-1 justify-center items-center font-semibold text-[12px] xl:text-[14px] text-white ${classBtnBox}`}
        >
          <button
            className={`w-3/4 md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] xl:px-[2px] py-[2px] rounded-md active:scale-[90%] ${classBtn}`}
            onClick={clickAct}
            disabled={disableBtn}
          >
            {btnText}
          </button>
          <button
            className={`w-3/4 md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] xl:px-[2px] py-[2px] rounded-md active:scale-[90%] ${classBtnTwo}`}
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
