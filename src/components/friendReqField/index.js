import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendReqField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const friendReqRef = ref(db, "friendRequests/");
  const friendsRef = ref(db, "friends/");
  let [friendReqList, setFriendReqList] = useState([]);
  let [friendReqEmpty, setFriendReqEmpty] = useState(false);

  useEffect(() => {
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().receiverId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendReqList(arr);
      // if (friendReqList.length === 0) {
      //   setFriendReqEmpty(true);
      // } else {
      //   setFriendReqEmpty(false);
      // }
    });
  }, []);

  // console.log(friendReqList);
  const handleFriendReqAccept = (item) => {
    set(push(friendsRef), {
      senderId: item.senderId,
      senderName: item.senderName,
      senderEmail: item.senderEmail,
      senderImg: item.senderImg,
      receiverId: item.receiverId,
      receiverName: item.receiverName,
      receiverEmail: item.receiverEmail,
      receiverImg: item.receiverImg,
      friendshipDate: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendRequests/" + item.id)).then(() => {
        console.log("reqasdasd accepted");
      });
    });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] lg:h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-5 mb-1 border-b-[3px]">
        <h3 className="text-xl md:text-2xl lg:text-xl font-semibold px-2">
          Friend Requests{" "}
          <span className="text-primaryTwo/80 text-base ml-4">
            {friendReqList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar className="flex flex-col px-2 max-h-[350px] lg:max-h-[35vh] px-1">
        {friendReqList.length < 1 ? (
          <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-[red]/20 mt-8 text-sm md:text-[15px] text-[red] rounded-md w-[90%] lg:w-full m-auto">
            Currently, you've no friend requests.
          </p>
        ) : (
          friendReqList.map((item) => (
            <ChatDisplayMin
              avatarPath={item.senderImg}
              avatarAlt={"req_avatar_1"}
              classAvatar={"xl:!mr-1.5 !w-1/5 xl:!w-[22%]"}
              chatName={item.senderName}
              message={item.senderEmail}
              classImg={"xl:!h-[65px] xl:!w-[65px]"}
              classTextBox={"xl:!w-[70%]"}
              classChtName={"xl:!text-base"}
              btnText={"Accept"}
              classBtnBox={"xl:!w-[30%]"}
              btnTwoText={"Decline"}
              classBtnTwo={"!bg-[red]/80 hover:!bg-[red]"}
              clickAct={() => handleFriendReqAccept(item)}
            />
          ))
        )}
        {/* {friendReqList.map((item) => (
          <ChatDisplayMin
            avatarPath={item.senderImg}
            avatarAlt={"req_avatar_1"}
            chatName={item.senderName}
            message={item.senderEmail}
            classImg={"!h-[72px] !w-[72px]"}
            classTextBox={"w-[63%] ml-1"}
            classMsg={"truncate text-[12px]"}
            btnText={"Accept"}
            classBtn={"!w-[28%]"}
            clickAct={() => handleFriendReqAccept(item)}
          />
        ))} */}
      </SimpleBar>
    </div>
  );
};

export default FriendReqField;
