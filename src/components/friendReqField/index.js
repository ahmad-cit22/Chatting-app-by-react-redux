import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const FriendReqField = () => {
  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-3">
        <h3 className="text-xl font-semibold px-2">
          Friend Requests{" "}
          <span className="text-primaryTwo/80 text-base ml-4">12</span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 383 }} className="flex flex-col px-2">
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_1"}
          chatName={"John Dill"}
          message={"Web Designer"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
          btnLink="#"
          chatLink="#"
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_2.png"}
          avatarAlt={"frnd_avatar_2"}
          chatName={"Helena James"}
          message={"Graphics Designer"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_4.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Rail Parker"}
          message={"Student"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_3.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Jimmy"}
          message={"CEO, ITB"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_4.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Rail Parker"}
          message={"Student"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_3.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Jimmy"}
          message={"CEO, ITB"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_4.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Rail Parker"}
          message={"Student"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_3.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Jimmy"}
          message={"CEO, ITB"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
        <ChatDisplayMin
          avatarPath={"images/frnd_avatar_1.png"}
          avatarAlt={"frnd_avatar_3"}
          chatName={"Kavin Rock"}
          message={"Web Developer"}
          classTextBox={"w-[53%]"}
          btnText={"Accept"}
        />
      </SimpleBar>
    </div>
  );
};

export default FriendReqField;
