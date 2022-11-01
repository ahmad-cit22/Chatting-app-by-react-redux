import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";

const FriendsField = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [friendList, setFriendList] = useState([]);
  let [friendEmpty, setFriendEmpty] = useState(false);
  let friendsRef = ref(db, "friends/");

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().receiverId ||
          auth.currentUser.uid === item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">Friends</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 369 }} className="flex flex-col px-2">
        {friendList.length < 1 ? (
          <p className="p-4 text-center bg-[red]/20 mt-8 text-[red]/90 rounded-md">
            Currently, you've no friends.
          </p>
        ) : (
          friendList.map((item) =>
            auth.currentUser.uid === item.senderId ? (
              <ChatDisplayMin
                avatarPath={item.receiverImg}
                chatName={item.receiverName}
                message={item.receiverEmail}
                avatarAlt={"frnd_avatar_3"}
                subText={item.friendshipDate}
                btnText={""}
                classAvatar={"w-[17%] mr-1"}
                classTextBox={"w-[62%] pl-3"}
                classChtName={"text-[15.9px]"}
                classMsg={"!text-[13px] truncate"}
                classBtn={"hidden"}
                classTime={"!justify-self-end pr-1 !text-[11px]"}
              />
            ) : (
              <ChatDisplayMin
                avatarPath={item.senderImg}
                chatName={item.senderName}
                message={item.senderEmail}
                avatarAlt={"frnd_avatar_3"}
                subText={item.friendshipDate}
                btnText={""}
                classAvatar={"w-[17%] mr-1"}
                classTextBox={"w-[62%] pl-3"}
                classChtName={"text-[15.9px]"}
                classMsg={"!text-[13px] truncate"}
                classBtn={"hidden"}
                classTime={"!justify-self-end pr-1 !text-[11px]"}
              />
            )
          )
        )}

        {/* {friendList.map((item) =>
          auth.currentUser.uid === item.senderId ? (
            <ChatDisplayMin
              avatarPath={item.receiverImg}
              chatName={item.receiverName}
              message={item.receiverEmail}
              avatarAlt={"frnd_avatar_3"}
              subText={item.friendshipDate}
              btnText={""}
              classAvatar={"w-[17%] mr-1"}
              classTextBox={"w-[62%] pl-3"}
              classChtName={"text-[15.9px]"}
              classMsg={"!text-[13px] truncate"}
              classBtn={"hidden"}
              classTime={"!justify-self-end pr-1 !text-[11px]"}
            />
          ) : (
            <ChatDisplayMin
              avatarPath={item.senderImg}
              chatName={item.senderName}
              message={item.senderEmail}
              avatarAlt={"frnd_avatar_3"}
              subText={item.friendshipDate}
              btnText={""}
              classAvatar={"w-[17%] mr-1"}
              classTextBox={"w-[62%] pl-3"}
              classChtName={"text-[15.9px]"}
              classMsg={"!text-[13px] truncate"}
              classBtn={"hidden"}
              classTime={"!justify-self-end pr-1 !text-[11px]"}
            />
          )
        )} */}
      </SimpleBar>
    </div>
  );
};

export default FriendsField;
