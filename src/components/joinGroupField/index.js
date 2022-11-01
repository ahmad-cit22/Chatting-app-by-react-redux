import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const JoinGroupField = () => {
  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_4px_rgba(0,0,0,0.25)] h-[36%] rounded-lg">
      <div className="flex justify-between items-center pb-3">
        <h3 className="text-xl font-semibold px-2">Join Groups</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 271 }} className="flex flex-col px-2">
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_1.png"}
          avatarAlt={"grp_avatar_1"}
          chatName={"Rocking Friends"}
          message={"Hi Guys, Wassup!"}
          classTextBox={"w-[72%]"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          btnLink="#"
          chatLink="#"
          classLink={"w-[11%]"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"grp_avatar_2"}
          chatName={"Lifetime Friends"}
          message={"Good to see you."}
          classTextBox={"w-[72%]"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          btnLink="#"
          chatLink="#"
          classLink={"w-[11%]"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"grp_avatar_3"}
          chatName={"Crazy Guyzz"}
          message={"What plans today?"}
          classTextBox={"w-[72%]"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          btnLink="#"
          chatLink="#"
          classLink={"w-[11%]"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_1.png"}
          avatarAlt={"grp_avatar_1"}
          chatName={"Rocking Friends"}
          message={"Hi Guys, Wassup!"}
          classTextBox={"w-[72%]"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          btnLink="#"
          chatLink="#"
          classLink={"w-[11%]"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"grp_avatar_2"}
          chatName={"Lifetime Friends"}
          message={"Good to see you."}
          classTextBox={"w-[72%]"}
          classImg={"!h-[72px] !w-[72px]"}
          btnText={"Join"}
          btnLink="#"
          chatLink="#"
          classLink={"w-[11%]"}
        />
      </SimpleBar>
    </div>
  );
};

export default JoinGroupField;
