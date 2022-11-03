import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const BlockField = () => {
  const db = getDatabase();
  const auth = getAuth();
  const currentId = auth.currentUser.uid;
  const blockedUsersRef = ref(db, "blockedUsers/");
  const friendsRef = ref(db, "friends/");

  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    onValue(blockedUsersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          currentId === item.val().blockedId ||
          currentId === item.val().blockedById
        ) {
          arr.push({ ...item.val(), blockId: item.key });
        }
      });
      setBlockList(arr);
    });
  }, []);

  const handleUnblock = (item) => {
    // console.log(item);
    remove(ref(db, "blockedUsers/" + item.blockId))
      .then(() => {
        if (item.blockedId === item.reqSender) {
          set(push(friendsRef), {
            senderId: item.blockedId,
            senderName: item.blockedName,
            senderEmail: item.blockedEmail,
            senderImg: item.blockedImg,
            receiverId: item.blockedById,
            receiverName: item.blockedByName,
            receiverEmail: item.blockedByEmail,
            receiverImg: item.blockedByImg,
            friendshipDate: item.friendshipDate,
          })
            .then(() => {
              console.log("done  1");
            })
            .catch((err) => {
              console.log(err.code);
            });
        } else {
          set(push(friendsRef), {
            senderId: item.blockedById,
            senderName: item.blockedByName,
            senderEmail: item.blockedByEmail,
            senderImg: item.blockedByImg,
            receiverId: item.blockedId,
            receiverName: item.blockedName,
            receiverEmail: item.blockedEmail,
            receiverImg: item.blockedImg,
            friendshipDate: item.friendshipDate,
          })
            .then(() => {
              console.log("done  2");
            })
            .catch((err) => {
              console.log(err.code);
            });
        }
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">
          Blocked Users
          <span className="text-primaryTwo/80 text-base ml-4">
            {blockList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar
        color="blue"
        style={{ maxHeight: 369 }}
        className="flex flex-col px-2"
      >
        {blockList.length < 1 ? (
          <p className="p-4 text-center bg-primary/20 mt-8 text-sm text-black rounded-md">
            Currently, blocklist is empty.
          </p>
        ) : (
          blockList.map((item) => (
            <ChatDisplayMin
              avatarPath={
                currentId === item.blockedById
                  ? item.blockedImg
                  : item.blockedByImg
              }
              chatName={
                currentId === item.blockedById
                  ? item.blockedName
                  : item.blockedByName
              }
              message={
                currentId === item.blockedById
                  ? item.blockedEmail
                  : item.blockedByEmail
              }
              subText={item.blockingDate}
              avatarAlt={"block_avatar_2"}
              btnText={currentId === item.blockedById ? "Unblock" : "Blocked"}
              classTextBox={"!w-[59%] pl-3 !mr-2"}
              classAvatar={"mr-1"}
              classChtName={""}
              classMsg={"!text-[13px] truncate"}
              classBtnBox={"!w-[40%] !text-[16px]"}
              classBtn={`${
                currentId !== item.blockedById
                  ? "!bg-white text-primaryTwo"
                  : ""
              } !px-2 !py-1`}
              classBtnTwo={"hidden"}
              classTime={"!justify-self-end !hidden pr-1 !text-[11px]"}
              disableBtn={currentId !== item.blockedById ? true : false}
              clickAct={() =>
                // friendReqList.includes(item.id + currentId)
                //   ? handleFriendReqAcceptU(item)
                // :
                handleUnblock(item)
              }
            />
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default BlockField;
