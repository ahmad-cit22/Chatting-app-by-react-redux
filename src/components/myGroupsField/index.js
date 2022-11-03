import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatDisplayMin from "../chatDisplayMin";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

const MyGroupsField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const currentId = auth.currentUser.uid;
  const groupsRef = ref(db, "groups/");

  const [myGroupList, setMyGroupList] = useState([]);

  useEffect(() => {
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentId === item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMyGroupList(arr);
    });
  }, []);

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[48%] rounded-lg">
      <div className="flex justify-between items-center pb-4 mb-1 border-b-[3px]">
        <h3 className="text-xl font-semibold px-2">
          My Groups
          <span className="text-primaryTwo/80 text-base ml-4">
            {myGroupList.length}
          </span>
        </h3>
        <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
      </div>
      <SimpleBar style={{ maxHeight: 379 }} className="flex flex-col px-2">
        {myGroupList.length < 1 ? (
          <p className="p-4 text-center bg-primary/20 mt-8 text-sm text-black rounded-md">
            Groups created by you will be shown here.
          </p>
        ) : (
          myGroupList.map((item) => (
            <ChatDisplayMin
              avatarPath={"images/grp_avatar_2.png"}
              avatarAlt={"frnd_avatar_3"}
              chatName={item.grpName}
              message={item.grpTag}
              btnText={"Info"}
              classAvatar={"mr-1"}
              classTextBox={"!w-[53%] pl-3"}
              classChtName={""}
              classMsg={"!text-[13px] truncate"}
              classBtn={""}
              btnTwoText={"Members"}
              classTime={"pr-1 justify-self-end hidden"}
              subText={""}
            />
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default MyGroupsField;
