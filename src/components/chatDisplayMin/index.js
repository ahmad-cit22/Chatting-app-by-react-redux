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
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start lg:pr-3">
      <Link to={""} className={`w-[15%] xl:w-[20%] ${classAvatar}`}>
        <picture
          className={`rounded-full overflow-hidden h-[50px] xl:h-[69px] w-[50px] xl:w-[69px] border-[0px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
        >
          <img
            src={avatarPath}
            className={"w-full"}
            loading="lazy"
            alt={avatarAlt}
          />
        </picture>
      </Link>
      <div className="flex justify-between w-[84%] xl:w-[79%] items-center">
        <div className={`w-[55%] xl:w-[59%] ${classTextBox}`}>
          <Link to={chatLink}>
            <p
              className={`text-sm xl:text-[15.8px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p className={`opacity-80 text-xs xl:text-sm truncate ${classMsg}`}>
            {message}
          </p>
          <p className={`text-[11px] xl:text-[13px] truncate ${classMsg}`}>
            {messageFooter}
          </p>
        </div>
        <div
          className={`w-[37%] flex flex-col gap-y-1 justify-center items-center font-semibold text-[12px] xl:text-[14.5px] text-white ${classBtnBox}`}
        >
          <button
            className={`w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-1 py-1 rounded-md active:scale-[90%] ${classBtn}`}
            onClick={clickAct}
            disabled={disableBtn}
          >
            {btnText}
          </button>
          <button
            className={`w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-1 py-1 rounded-md active:scale-[90%] ${classBtnTwo}`}
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
