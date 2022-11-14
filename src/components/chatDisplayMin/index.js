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
}) => {
  return (
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start md:px-4 lg:px-0">
      <Link
        to={""}
        className={`w-[15%] md:w-[12.5%] lg:w-[19%] ${classAvatar}`}
      >
        <picture
          className={`rounded-full overflow-hidden h-[50px] md:h-[78px] lg:h-[60px] w-[50px] md:w-[78px] lg:w-[60px] border-[0px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
        >
          <img
            src={avatarPath}
            className={"w-full"}
            loading="lazy"
            alt={avatarAlt}
          />
        </picture>
      </Link>
      <div className="flex justify-between w-[84%] md:w-[87%] lg:w-[80%] items-center">
        <div className={`w-[55%] md:w-[77%] lg:w-[59%] pr-2 ${classTextBox}`}>
          <Link to={chatLink}>
            <p
              className={`text-sm md:text-[19px] pb-[1px] lg:text-[15px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p
            className={`opacity-80 text-[11px] md:text-base lg:text-[13px] truncate ${classMsg}`}
          >
            {message}
          </p>
          <p
            className={`text-[10px] md:text-[15px] lg:text-xs truncate ${classMsgFooter}`}
          >
            {messageFooter}
          </p>
        </div>
        <div
          className={`w-[40%] md:w-[22%] lg:w-[40%] flex flex-col gap-y-1 justify-center items-center font-semibold text-[12px] md:text-lg lg:text-[14px] text-white ${classBtnBox}`}
        >
          <button
            className={`w-[78%] md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtn}`}
            onClick={clickAct}
            disabled={disableBtn}
          >
            {btnText}
          </button>
          <button
            className={`w-[78%] md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtnTwo}`}
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
