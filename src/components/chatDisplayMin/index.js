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
  classTime,
  subText,
  clickAct,
}) => {
  return (
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start">
      <Link to={""} className={`w-1/5 ${classAvatar}`}>
        <picture
          className={`rounded-full overflow-hidden h-[65px] w-[65px] border-[2px] border-photoUp flex justify-center items-center bg-white ${classImg}`}
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
              className={`text-lg font-semibold hover:text-primaryTwo cursor-pointer linear duration-300 ${classChtName}`}
            >
              {chatName}
            </p>
          </Link>
          <p className={`opacity-70 text-sm ${classMsg}`}>{message}</p>
        </div>
        <button
          className={`w-1/5 justify-self-end bg-primary/90 hover:bg-primary linear duration-300 text-[17px] font-semibold text-white px-3 py-1 rounded-md ${classBtn}`}
          onClick={clickAct}
        >
          {btnText}
        </button>
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
