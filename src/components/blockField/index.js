import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const BlockField = () => {
  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">Blocked Users</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar
        color="blue"
        style={{ maxHeight: 369 }}
        className="flex flex-col px-2"
      >
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_2"}
          chatName={"John Doe"}
          message={"Long time no see.."}
          btnText={"Unblock"}
          classAvatar={"w-[17%] mr-1"}
          classTextBox={"!w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"!w-[37%] !justify-self-end !text-[16px] px-0 py-1"}
        />
      </SimpleBar>
    </div>
  );
};

export default BlockField;
