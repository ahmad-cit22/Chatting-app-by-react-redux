import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const JoinGroupField = () => {
  return (
    <div className="w-full py-1 px-3 relative bg-white drop-shadow-[0px_6px_4px_rgba(0,0,0,0.25)] h-[36%] rounded-lg">
      <div className="flex justify-between items-center pb-5 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">Join Groups</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 271 }} className="flex flex-col px-2">
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_1.png"}
          avatarAlt={"grp_avatar_1"}
          classAvatar={""}
          chatName={"Rocking Friends"}
          message={"Hi Guys, Wassup!"}
          classTextBox={"w-[78%]"}
          classChtName={"!text-lg"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          classBtn={"!text-base"}
          chatLink="#"
        />
      </SimpleBar>
    </div>
  );
};

export default JoinGroupField;
