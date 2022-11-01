import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const FriendReqField = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [friendReqList, setFriendReqList] = useState([]);
  let [friendReqEmpty, setFriendReqEmpty] = useState(false);

  useEffect(() => {
    let friendReqRef = ref(db, "friendRequests/");
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().receiverId) {
          arr.push(item.val());
        }
      });
      setFriendReqList(arr);
      if (friendReqList.length === 0) {
        setFriendReqEmpty(true);
      } else {
        setFriendReqEmpty(false);
      }
    });
    console.log(friendReqList.length);
  }, [friendReqList]);

  // const handleFriendReq = (item) => {
  //   const friendReqRef = ref(db, "friendRequests/");
  //   set(push(friendReqRef), {
  //     senderId: auth.currentUser.uid,
  //     senderName: auth.currentUser.displayName,
  //     senderEmail: auth.currentUser.email,
  //     receiverId: item.id,
  //     receiverName: item.fullName,
  //     receiverEmail: item.email,
  //   }).then(() => {
  //     console.log("done");
  //   });
  // };

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
        {friendReqEmpty ? (
          <p className="p-4 text-center bg-[red]/20 mt-8 text-[red]/90 rounded-md">
            Currently, you've no friend requests.
          </p>
        ) : (
          friendReqList.map((item) => (
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
              chatLink="#"
            />
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default FriendReqField;
