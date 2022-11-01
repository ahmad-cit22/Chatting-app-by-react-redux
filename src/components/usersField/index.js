import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const UsersField = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let userListRef = ref(db, "users/");
    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUsersList(arr);
    });
  }, []);

  const handleFriendReq = (item) => {
    const friendReqRef = ref(db, "friendRequests/");
    set(push(friendReqRef), {
      senderId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
      senderEmail: auth.currentUser.email,
      senderImg: auth.currentUser.photoURL,
      receiverId: item.id,
      receiverName: item.fullName,
      receiverEmail: item.email,
    }).then(() => {
      console.log("done");
    });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-xl font-semibold px-2">Users</h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar
        color="blue"
        style={{ maxHeight: 369 }}
        className="flex flex-col px-2"
      >
        {usersList.map((item) => (
          <ChatDisplayMin
            avatarPath={item.profile_picture}
            avatarAlt={"friend_avatar_3"}
            chatName={item.fullName}
            message={item.email}
            btnText={"+"}
            classAvatar={"w-[17%] mr-1"}
            classTextBox={"w-[80%] pl-3"}
            classChtName={"text-[15.9px]"}
            classMsg={"!text-[13px] truncate"}
            classBtn={"w-[15%] !text-[24px] !px-2.5 !py-[0px]"}
            clickAct={() => handleFriendReq(item)}
          />
        ))}
      </SimpleBar>
    </div>
  );
};

export default UsersField;
