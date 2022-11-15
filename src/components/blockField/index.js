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
import { useSelector } from "react-redux";

const BlockField = () => {
  const db = getDatabase();
const userData = useSelector((state) => state.userLoginInfo.userInfo);
const currentId = userData.uid;
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
    <div className="w-full py-3 px-3 mb-20 md:mb-28 lg:mb-3 xl:mb-0 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] xl:h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl md:text-2xl lg:text-xl font-semibold px-2">
          Blocked Users
          <span className="text-primaryTwo/80 text-base ml-4">
            {blockList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar
        color="blue"
        className="flex flex-col px-2 max-h-[350px] xl:max-h-[35vh] lg:h-[350px] xl:h-auto px-1"
      >
        {blockList.length < 1 ? (
          <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 text-sm md:text-[15px] text-black rounded-md w-[85%] lg:w-full m-auto">
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
              classMsg={""}
              classBtnBox={""}
              classBtn={`${
                currentId !== item.blockedById
                  ? "!bg-white text-primaryTwo drop-shadow-lg"
                  : ""
              }`}
              classBtnTwo={"hidden"}
              classTime={"!hidden pr-1"}
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
