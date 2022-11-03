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
}) => {
  return (
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start pr-3">
      <Link to={""} className={`w-1/5 ${classAvatar}`}>
        <picture
          className={`rounded-full overflow-hidden h-[65px] w-[65px] border-[0px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
        >
          <img
            src={avatarPath}
            className={"w-full"}
            loading="lazy"
            alt={avatarAlt}
          />
        </picture>
      </Link>
      <div className="flex justify-between w-4/5 items-center">
        <div className={`w-3/5 pl-2 ${classTextBox}`}>
          <Link to={chatLink}>
            <p
              className={`text-[15.8px] font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p className={`opacity-70 text-sm truncate ${classMsg}`}>{message}</p>
        </div>
        <div
          className={`flex justify-end w-1/5 !justify-self-end text-[17px] font-semibold text-white ${classBtnBox}`}
        >
          <button
            className={`bg-primary/90 hover:bg-primary linear duration-300 text-[14.5px] px-3 py-1 rounded-md active:scale-[90%] ${classBtn}`}
            onClick={clickAct}
            disabled={disableBtn}
          >
            {btnText}
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
