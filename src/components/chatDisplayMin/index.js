import React from "react";
import { Link } from "react-router-dom";

const ChatDisplayMin = ({
  avatarPath,
  avatarAlt,
  chatName,
  chatLink,
  email,
  btnText,
  btnLink,
  classAvatar,
  classTextBox,
  classChtName,
  classMsg,
  classLink,
  classBtn,
  classTime,
  subText,
}) => {
  return (
    <div className="py-[14px] flex items-center border-b-[.5px] border-b-slate-300 last:border-none justify-start">
      <Link to={""} className={`w-1/5 ${classAvatar}`}>
        <picture>
          <img src={avatarPath} loading="lazy" alt={avatarAlt} />
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
          <p className={`opacity-70 text-sm ${classMsg}`}>{email}</p>
        </div>
        <Link to={btnLink} className={`w-1/5 justify-self-end ${classLink}`}>
          <button
            className={`bg-primary/90 hover:bg-primary linear duration-300 text-[17px] font-semibold text-white px-3 py-1 rounded-md ${classBtn}`}
          >
            {btnText}
          </button>
        </Link>
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
