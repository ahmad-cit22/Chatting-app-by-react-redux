import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const GroupsField = () => {
  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-xl font-semibold px-2">My Groups</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 379 }} className="flex flex-col px-2">
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"College friends"}
          message={"Go there quickly!"}
          btnText={""}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"34 Members"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_1.png"}
          avatarAlt={"frnd_avatar_2"}
          chatName={"Dhaka Boys'"}
          message={"Long time no see.."}
          btnText={""}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"21 Members"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Crazy Guyz"}
          message={"Lunch?"}
          btnText={""}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"11 Members"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"ESS React 01"}
          message={"Coming today?"}
          btnText={""}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"22 Members"}
          classTime={"justify-self-end"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_1"}
          chatName={"John Dill"}
          message={"Hey bro, Wassup!"}
          btnText={""}
          btnLink="#"
          chatLink="#"
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"8 Members"}
        />
        <ChatDisplayMin
          avatarPath={"images/grp_avatar_2.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"ESS React 01"}
          message={"Coming today?"}
          btnText={""}
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"22 Members"}
          classTime={"justify-self-end"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_1"}
          chatName={"CWEB DEV 22"}
          message={"Hey bro, Wassup!"}
          btnText={""}
          btnLink="#"
          chatLink="#"
          classAvatar={"w-[17%]"}
          classTextBox={"w-[57%] pl-3"}
          classChtName={"text-base pb-[2px]"}
          classMsg={"text-xs"}
          classLink={"hidden"}
          subText={"8 Members"}
        />
      </SimpleBar>
    </div>
  );
};

export default GroupsField;
