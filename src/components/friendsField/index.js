import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";

const FriendsField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  const [friendEmpty, setFriendEmpty] = useState(false);
  const friendsRef = ref(db, "friends/");
  const blockedUsersRef = ref(db, "blockedUsers/");

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

  const handleBlock = (item) => {
    auth.currentUser.uid === item.senderId
      ? set(push(blockedUsersRef), {
          blockedId: item.receiverId,
          blockedName: item.receiverName,
          blockedEmail: item.receiverEmail,
          blockedImg: item.receiverImg,
          blockedById: item.senderId,
          blockedByName: item.senderName,
          blockedByEmail: item.senderEmail,
          blockedByImg: item.senderImg,
          blockingDate: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        }).then(() => {
          remove(ref(db, "friends/" + item.id)).then(() => {
            console.log("block done");
          });
        })
      : set(push(blockedUsersRef), {
          blockedId: item.senderId,
          blockedName: item.senderName,
          blockedEmail: item.senderEmail,
          blockedImg: item.senderImg,
          blockedById: item.receiverId,
          blockedByName: item.receiverName,
          blockedByEmail: item.receiverEmail,
          blockedByImg: item.receiverImg,
          blockingDate: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        }).then(() => {
          remove(ref(db, "friends/" + item.id)).then(() => {
            console.log("block done");
          });
        });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">
          Friends{" "}
          <span className="text-primaryTwo/80 text-base ml-4">
            {friendList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 369 }} className="flex flex-col px-2">
        {friendList.length < 1 ? (
          <p className="p-4 text-center bg-[red]/20 mt-8 text-sm text-[red]/90 rounded-md">
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
                btnText={"Block"}
                classAvatar={"mr-1"}
                classTextBox={"!w-[65%] pl-3"}
                classChtName={""}
                classMsg={"!text-[13px] truncate"}
                classBtnBox={"!w-1/6 !justify-end"}
                classTime={"!justify-self-end !hidden pr-1 !text-[11px]"}
                clickAct={() => handleBlock(item)}
              />
            ) : (
              <ChatDisplayMin
                avatarPath={item.senderImg}
                chatName={item.senderName}
                message={item.senderEmail}
                avatarAlt={"frnd_avatar_3"}
                subText={item.friendshipDate}
                btnText={"Block"}
                classAvatar={"mr-1"}
                classTextBox={"!w-[65%] pl-3"}
                classChtName={""}
                classMsg={"!text-[13px] truncate"}
                classBtnBox={"!w-1/6"}
                classTime={"!justify-self-end !hidden pr-1 !text-[11px]"}
                clickAct={() => handleBlock(item)}
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
