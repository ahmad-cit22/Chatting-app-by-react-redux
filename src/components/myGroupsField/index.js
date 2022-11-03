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
  const groupRequestsRef = ref(db, "groupRequests/");
  const groupMembersRef = ref(db, "groupMembers/");

  const [myGroupList, setMyGroupList] = useState([]);
  const [grpReqList, setGrpReqList] = useState([]);

  const [grpReqListSorted, setGrpReqListSorted] = useState([]);

  const [grpId, setGrpId] = useState("");
  const [grpName, setGrpName] = useState("");

  const [showInfo, setShowInfo] = useState(false);

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

  useEffect(() => {
    onValue(groupRequestsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentId === item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGrpReqList(arr);
      console.log(grpReqList);
    });
  }, []);

  const handleGrpInfo = (item) => {
    setShowInfo(true);
    setGrpId(item.id);
    setGrpName(item.grpName);

    let arr = [];
    grpReqList.map((reqItem) => {
      if (reqItem.grpId === grpId) {
        arr.push(reqItem);
      }
      setGrpReqListSorted(arr);
    });
  };

  const handleGrpReqAccept = (item) => {
    set(push(groupMembersRef), {
      memberId: item.senderId,
      memberName: item.senderName,
      memberEmail: item.senderEmail,
      memberImg: item.senderImg,
      grpId: item.grpId,
      grpReqId: item.id,
      grpName: item.grpName,
      grpTag: item.grpTag,
      adminId: item.adminId,
      adminName: item.adminName,
      adminEmail: item.adminEmail,
      adminImg: item.adminImg,
      createdAt: item.createdAt,
      membershipDate: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      console.log("done new mem");
    });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] h-[48%] rounded-lg">
      <div className="flex justify-between items-center cursor-pointer pb-4 mb-1 border-b-[3px]">
        <h3
          className="text-xl font-semibold px-2"
          onClick={() => setShowInfo(false)}
        >
          My Groups
          <span className="text-primaryTwo/80 text-base ml-4">
            {myGroupList.length}
          </span>
        </h3>
        {showInfo ? (
          <button
            className={`bg-primary/90 hover:bg-primary linear duration-300 text-[14.5px] text-white mr-3 font-semibold px-2 py-1 rounded-md active:scale-[90%]`}
            onClick={() => setShowInfo(false)}
          >
            Go Back
          </button>
        ) : (
          <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
        )}
      </div>
      <SimpleBar style={{ maxHeight: 379 }} className="flex flex-col px-2">
        {myGroupList.length < 1 ? (
          <p className="p-4 text-center bg-primary/20 mt-8 text-sm text-black rounded-md">
            Groups created by you will be shown here.
          </p>
        ) : showInfo ? (
          <>
            <p className="font-semibold text-primaryTwo text-[22px] mb-4 text-center mt-1">
              {grpName}
            </p>
            <p className="font-semibold text-[17px] text-primary">
              Group Requests
            </p>
            {grpReqList.map(
              (item) =>
                item.grpId === grpId && (
                  <ChatDisplayMin
                    avatarPath={item.senderImg}
                    avatarAlt={"frnd_avatar_3"}
                    chatName={item.senderName}
                    message={item.senderEmail}
                    classAvatar={"mr-1"}
                    classTextBox={"pl-3"}
                    classChtName={""}
                    classMsg={"!text-[13px] truncate"}
                    btnText={"Accept"}
                    classBtn={""}
                    btnTwoText={"Decline"}
                    classBtnTwo={"!bg-[red]"}
                    classTime={"pr-1 justify-self-end hidden"}
                    subText={""}
                    clickAct={() => handleGrpReqAccept(item)}
                  />
                )
              // : (
              //   <p className="p-4 text-center bg-[red]/20 mt-8 text-[15px] text-[red] rounded-md">
              //     No requests found.
              //   </p>
              // )
            )}
          </>
        ) : (
          myGroupList.map((item) => (
            <ChatDisplayMin
              avatarPath={"images/grp_avatar_2.png"}
              avatarAlt={"frnd_avatar_3"}
              chatName={item.grpName}
              message={item.grpTag}
              classAvatar={"mr-1"}
              classTextBox={"pl-3"}
              classChtName={""}
              classMsg={"!text-[13px] truncate"}
              btnText={"Info"}
              classBtn={""}
              btnTwoText={"Members"}
              classTime={"pr-1 justify-self-end hidden"}
              subText={""}
              clickAct={() => handleGrpInfo(item)}
            />
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default MyGroupsField;
