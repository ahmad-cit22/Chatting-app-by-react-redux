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
  const userListRef = ref(db, "users/");
  const friendReqRef = ref(db, "friendRequests/");
  const friendsRef = ref(db, "friends/");
  const blockedUsersRef = ref(db, "blockedUsers/");
  const currentId = auth.currentUser.uid;
  const [usersList, setUsersList] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== currentId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUsersList(arr);
    });
  }, []);

  useEffect(() => {
    onValue(friendReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendReqList(arr);
    });
  }, []);

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    onValue(blockedUsersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockedId + item.val().blockedById);
      });
      setBlockList(arr);
    });
  }, []);

  // const handleFriendReqAcceptU = (sender) => {
  //   onValue(friendReqRef, (snapshot) => {
  //     let reqId = "";
  //     snapshot.forEach((item) => {
  //       if (
  //         sender.id === item.val().senderId &&
  //         currentId === item.val().receiverId
  //       ) {
  //         reqId = item.key;
  //         console.log("user");
  //         set(push(friendsRef), {
  //           senderId: item.val().senderId,
  //           senderName: item.val().senderName,
  //           senderEmail: item.val().senderEmail,
  //           senderImg: item.val().senderImg,
  //           receiverId: item.val().receiverId,
  //           receiverName: item.val().receiverName,
  //           receiverEmail: item.val().receiverEmail,
  //           receiverImg: item.val().receiverImg,
  //           friendshipDate: `${new Date().getDate()}/${
  //             new Date().getMonth() + 1
  //           }/${new Date().getFullYear()}`,
  //         }).then(() => {
  //           remove(ref(db, "friendRequests/" + reqId)).then(() => {
  //             console.log("req accepted");
  //           });
  //         });
  //       }
  //     });
  //   });
  // };

  const handleFriendReq = (item) => {
    const friendReqRef = ref(db, "friendRequests/");
    set(push(friendReqRef), {
      senderId: currentId,
      senderName: auth.currentUser.displayName,
      senderEmail: auth.currentUser.email,
      senderImg: auth.currentUser.photoURL,
      receiverId: item.id,
      receiverName: item.fullName,
      receiverEmail: item.email,
      receiverImg: item.profile_picture,
    }).then(() => {
      console.log("done");
    });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[47%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
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
            classAvatar={"mr-1"}
            classTextBox={"pl-3"}
            classChtName={""}
            classMsg={"!text-[13px]"}
            classBtnBox={""}
            classBtn={`${
              friendReqList.includes(currentId + item.id) ||
              friendList.includes(currentId + item.id) ||
              friendList.includes(item.id + currentId) ||
              blockList.includes(currentId + item.id)
                ? "!bg-white text-primaryTwo drop-shadow-lg"
                : ""
            }`}
            classBtnTwo={"hidden"}
            btnText={`${
              friendReqList.includes(currentId + item.id)
                ? "Added"
                : friendReqList.includes(item.id + currentId)
                ? "Accept"
                : friendList.includes(currentId + item.id) ||
                  friendList.includes(item.id + currentId)
                ? "Friends"
                : blockList.includes(currentId + item.id)
                ? "Blocked"
                : blockList.includes(item.id + currentId)
                ? "Unblock"
                : "Add Friend"
            }`}
            disableBtn={
              friendReqList.includes(currentId + item.id) ||
              friendList.includes(currentId + item.id) ||
              friendList.includes(item.id + currentId) ||
              friendReqList.includes(item.id + currentId) ||
              blockList.includes(currentId + item.id) ||
              blockList.includes(item.id + currentId)
                ? true
                : false
            }
            clickAct={() =>
              // friendReqList.includes(item.id + currentId)
              //   ? handleFriendReqAcceptU(item)
              // :
              handleFriendReq(item)
            }
          />
        ))}
      </SimpleBar>
    </div>
  );
};

export default UsersField;
