import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const BlockField = () => {
  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4">
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
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Mashie Grill"}
          message={"Lunch?"}
          btnText={"Unblock"}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
        />

        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Ena Harbar"}
          message={"Coming today?"}
          btnText={"Unblock"}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
          classTime={"justify-self-end"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Hana Dan"}
          message={"Go there quickly!"}
          btnText={"Unblock"}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
        />

        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_1"}
          chatName={"Jacky"}
          message={"Hey bro, Wassup!"}
          btnText={"Unblock"}
          btnLink="#"
          chatLink="#"
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Neeta"}
          message={"Coming today?"}
          btnText={"Unblock"}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[55%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classBtn={"text-base px-2.5 py-[3px]"}
          classTime={"justify-self-end"}
        />
      </SimpleBar>
    </div>
  );
};

export default BlockField;
