import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
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
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../slices/activeChatSlice";

const FriendsField = ({ btnOneTxt, messageBtn }) => {
  const db = getDatabase();
  const userData = useSelector((state) => state.userLoginInfo.userInfo);
  const currentId = userData.uid;
  const dispatch = useDispatch();

  const friendsRef = ref(db, "friends/");
  const blockedUsersRef = ref(db, "blockedUsers/");

  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          currentId === item.val().receiverId ||
          currentId === item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  const handleBlock = (item) => {
    currentId === item.senderId
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
          reqSender: currentId,
          friendshipDate: item.friendshipDate,
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
          reqSender: item.senderId,
          friendshipDate: item.friendshipDate,
        }).then(() => {
          remove(ref(db, "friends/" + item.id)).then(() => {
            console.log("block done");
          });
        });
  };

  const handleActiveChatMsg = (item) => {
    const chatInfo = {
      status: "single",
    };
    if (currentId === item.receiverId) {
      chatInfo.receiverId = item.senderId;
      chatInfo.receiverName = item.senderName;
      chatInfo.receiverEmail = item.senderEmail;
      chatInfo.receiverImg = item.senderImg;
    } else {
      chatInfo.receiverId = item.receiverId;
      chatInfo.receiverName = item.receiverName;
      chatInfo.receiverEmail = item.receiverEmail;
      chatInfo.receiverImg = item.receiverImg;
    }
    dispatch(activeChat(chatInfo));
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] xl:h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl md:text-2xl lg:text-xl font-semibold px-2">
          Friends{" "}
          <span className="text-primaryTwo/80 text-base ml-4">
            {friendList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar className="flex flex-col px-2 max-h-[350px] xl:max-h-[36vh] lg:h-[350px] xl:h-auto px-1">
        {friendList.length < 1 ? (
          <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-[red]/20 mt-8 text-sm md:text-[15px] text-[red] rounded-md w-[85%] lg:w-full m-auto">
            Currently, you've no friends.
          </p>
        ) : (
          friendList.map((item) =>
            currentId === item.senderId ? (
              <ChatDisplayMin
                avatarPath={item.receiverImg}
                chatName={item.receiverName}
                message={item.receiverEmail}
                avatarAlt={"frnd_avatar_3"}
                subText={item.friendshipDate}
                btnText={btnOneTxt}
                classAvatar={"mr-1"}
                classTextBox={"pl-3"}
                classChtName={""}
                classMsg={""}
                classBtn={`!w-4/5 md:!w-full`}
                classBtnBox={" lg:!w-[30%]"}
                classBtnTwo={"hidden"}
                classTime={"!hidden"}
                clickAct={() => handleBlock(item)}
                clickActMsg={() => handleActiveChatMsg(item)}
                messageBtn={messageBtn}
              />
            ) : (
              <ChatDisplayMin
                avatarPath={item.senderImg}
                chatName={item.senderName}
                message={item.senderEmail}
                avatarAlt={"frnd_avatar_3"}
                subText={item.friendshipDate}
                btnText={btnOneTxt}
                classAvatar={"mr-1"}
                classTextBox={"pl-3"}
                classChtName={""}
                classMsg={""}
                classBtn={`!w-4/5 md:!w-full`}
                classBtnBox={" lg:!w-[30%]"}
                classBtnTwo={"hidden"}
                classTime={"!hidden"}
                clickAct={() => handleBlock(item)}
                clickActMsg={() => handleActiveChatMsg(item)}
                messageBtn={messageBtn}
              />
            )
          )
        )}

        {/* {friendList.map((item) =>
          currentId === item.senderId ? (
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
