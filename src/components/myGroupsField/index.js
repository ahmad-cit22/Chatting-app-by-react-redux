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
import { useEffect, useState } from "react";

const MyGroupsField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const currentId = auth.currentUser.uid;
  const groupsRef = ref(db, "groups/");
  const groupRequestsRef = ref(db, "groupRequests/");
  const groupMembersRef = ref(db, "groupMembers/");

  const [myGroupList, setMyGroupList] = useState([]);
  const [groupReqList, setGroupReqList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);

  const [grpName, setGrpName] = useState("");

  const [showInfo, setShowInfo] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

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

  const handleGrpInfo = (item) => {
    setShowInfo(true);
    setGrpName(item.grpName);
    onValue(groupRequestsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((reqItem) => {
        if (reqItem.val().grpId === item.id) {
          arr.push({ ...reqItem.val(), id: reqItem.key });
        }
      });
      setGroupReqList(arr);
    });
  };

  const handleGrpMembers = (item) => {
    setShowMembers(true);
    setGrpName(item.grpName);
    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((memberItem) => {
        if (memberItem.val().grpId === item.id) {
          arr.push({ ...memberItem.val(), id: memberItem.key });
        }
      });
      setGroupMemberList(arr);
    });
  };

  const handleGrpReqAccept = (item) => {
    set(push(groupMembersRef), {
      memberId: item.senderId,
      memberName: item.senderName,
      memberEmail: item.senderEmail,
      memberImg: item.senderImg,
      grpId: item.grpId,
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
      remove(ref(db, "groupRequests/" + item.id)).then(() => {
        console.log("done req dlt");
      });
    });
  };

  const handleGrpReqDecline = (item) => {
    remove(ref(db, "groupRequests/" + item.id)).then(() => {
      console.log("done req dlt");
    });
  };

  return (
    <div className="w-full py-3 px-3 relative bg-white drop-shadow-[0px_6px_3px_rgba(0,0,0,0.25)] lg:h-[48%] rounded-lg">
      <div className="flex justify-between items-center cursor-pointer pb-4 mb-1 border-b-[3px]">
        {/* heading starts */}
        <h3 className="text-xl font-semibold px-2">
          {showInfo || showMembers ? grpName : "My Groups"}
          {!showInfo && !showMembers && (
            <span className="text-primaryTwo/80 text-base ml-4">
              {myGroupList.length}
            </span>
          )}
        </h3>

        {showInfo || showMembers ? (
          <button
            className={`bg-primary/90 hover:bg-primary linear duration-300 text-[14.5px] text-white mr-3 font-semibold px-2 py-1 rounded-md active:scale-[90%]`}
            onClick={() =>
              showInfo
                ? setShowInfo(false)
                : showMembers
                ? setShowMembers(false)
                : ""
            }
          >
            Go Back
          </button>
        ) : (
          <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" />
        )}
      </div>
      {/* header ends */}

      {/* main contents starts */}
      <SimpleBar className="flex flex-col px-2 max-h-[350px] lg:max-h-[285px] px-1">
        {myGroupList.length < 1 ? (
          <p className="p-4 text-center bg-primary/20 mt-8 text-sm text-black rounded-md">
            Groups created by you will be shown here.
          </p>
        ) : showInfo ? (
          <>
            <p className="font-semibold text-[17px] text-primary">
              Group Requests{" "}
              <span className="text-primaryTwo/80 text-base ml-5">
                {groupReqList.length > 0 && groupReqList.length}
              </span>
            </p>

            {groupReqList.length < 1 ? (
              <p className="p-4 text-center bg-primary/20 mt-8 text-[15px] font-semibold text-black rounded-md">
                No join requests.
              </p>
            ) : (
              groupReqList.map((item) => (
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
                  classBtnTwo={"!bg-[red]/80 hover:!bg-[red]"}
                  classTime={"pr-1 justify-self-end hidden"}
                  subText={""}
                  clickAct={() => handleGrpReqAccept(item)}
                  clickActTwo={() => handleGrpReqDecline(item)}
                />
              ))
            )}
          </>
        ) : showMembers ? (
          <>
            <p className="font-semibold text-[17px] text-primary">
              Group Members{" "}
              <span className="text-primaryTwo/80 text-base ml-5">
                {groupMemberList.length > 0 && groupMemberList.length}
              </span>
            </p>

            {groupMemberList.length < 1 ? (
              <p className="p-4 text-center bg-primary/20 mt-8 text-[15px] font-semibold text-black rounded-md">
                Group members will be shown here.
              </p>
            ) : (
              groupMemberList.map((item) => (
                <ChatDisplayMin
                  avatarPath={item.memberImg}
                  avatarAlt={"frnd_avatar_3"}
                  chatName={item.memberName}
                  message={item.memberEmail}
                  classAvatar={"mr-1"}
                  classTextBox={"pl-3"}
                  classChtName={""}
                  classMsg={"!text-[13px] truncate"}
                  btnText={"Message"}
                  classBtn={""}
                  btnTwoText={"Remove"}
                  classBtnTwo={"!bg-[red]/80 hover:!bg-[red]"}
                  classTime={"pr-1 justify-self-end hidden"}
                  subText={""}
                  clickAct={() => handleGrpReqAccept(item)}
                  clickActTwo={() => handleGrpReqDecline(item)}
                />
              ))
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
              clickActTwo={() => handleGrpMembers(item)}
            />
          ))
        )}
      </SimpleBar>
      {/* main contents ends */}
    </div>
  );
};

export default MyGroupsField;
