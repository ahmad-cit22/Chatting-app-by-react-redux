import React, { useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import ChatDisplayMin from "../chatDisplayMin";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeChat } from "../../slices/activeChatSlice";

const GroupsField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const userData = useSelector((state) => state.userLoginInfo.userInfo);
  const currentId = userData.uid;
  const dispatch = useDispatch();

  const groupsRef = ref(db, "groups/");
  const groupMembersRef = ref(db, "groupMembers/");

  const refCreateGroupFrom = useRef(null);

  // const [showModal, setShowModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);

  const [myGroupList, setMyGroupList] = useState([]);
  const [joinedGroupList, setJoinedGroupList] = useState([]);

  const handleActiveChatGrp = (item) => {
    const chatInfo = {
      status: "group",
    };
    if (currentId === item.adminId) {
      chatInfo.receiverId = item.id;
      chatInfo.receiverName = item.grpName;
      chatInfo.receiverTag = item.grpTag;
      chatInfo.receiverImg = item.grpImg;
    } else {
      chatInfo.receiverId = item.grpId;
      chatInfo.receiverName = item.grpName;
      chatInfo.receiverTag = item.grpTag;
      chatInfo.receiverImg = item.grpImg;
    }
    dispatch(activeChat(chatInfo));
  };

  // const cancelGroupReq = (item) => {
  //   onValue(groupRequestsRef, (snapshot) => {
  //     snapshot.forEach((grpReq) => {
  //       if (
  //         grpReq.val().grpId === item.id &&
  //         grpReq.val().senderId === currentId
  //       ) {
  //         remove(ref(db, "groupRequests/" + grpReq.key)).then(() => {
  //           console.log("reqasdasd del");
  //         });
  //       }
  //     });
  //   });
  // };

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

    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentId === item.val().memberId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setJoinedGroupList(arr);
    });
  }, []);
  return (
    <>
      <div className="w-full py-1 lg:pb-3 xl:pb-1 px-3 relative bg-white drop-shadow-[0px_6px_4px_rgba(0,0,0,0.25)] xl:h-[49.5%] rounded-lg">
        <div className="flex justify-between items-center pb-5 mb-1 border-b-[3px] pr-2">
          <h3 className="text-xl md:text-2xl lg:text-xl font-semibold px-2">
            Groups
          </h3>
        </div>
        <SimpleBar className="flex flex-col px-2 max-h-[350px] xl:max-h-[37vh] lg:h-[265px] xl:h-auto px-1">
          {myGroupList.length + joinedGroupList.length < 1 && (
            <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 text-sm md:text-[15px] text-black rounded-md w-[85%] lg:w-full m-auto">
              You haven't joined or created any groups yet.
            </p>
          )}
          {myGroupList.map((item) => (
            <ChatDisplayMin
              avatarPath={item.grpImg}
              avatarAlt={"grp_avatar_1"}
              classAvatar={
                "xl:!mr-1 !w-1/5 md:!w-[15%] lg:!w-[20%] xl:!w-[23%]"
              }
              chatName={item.grpName}
              message={item.grpTag}
              messageFooter={``}
              classTextBox={"md:!w-[79%] lg:!w-[59%] xl:!w-[57%]"}
              classChtName={"xl:!text-base"}
              classImg={"lg:!h-[64px] lg:!w-[64px] xl:!h-[70px] xl:!w-[70px]"}
              btnText={`Chat`}
              classBtn={`!w-4/5 md:!w-full`}
              classBtnBox={"!w-[43%] md:!w-[26%] lg:!w-[30%]"}
              classBtnTwo={"hidden !w-4/5 md:!w-full"}
              chatLink="#"
              disableBtn={""}
              clickAct={() => handleActiveChatGrp(item)}
            />
          ))}
          {joinedGroupList.map((item) => (
            <ChatDisplayMin
              avatarPath={item.grpImg}
              avatarAlt={"grp_avatar_1"}
              classAvatar={
                "xl:!mr-1 !w-1/5 md:!w-[15%] lg:!w-[20%] xl:!w-[23%]"
              }
              chatName={item.grpName}
              message={item.grpTag}
              messageFooter={``}
              classTextBox={"md:!w-[79%] lg:!w-[59%] xl:!w-[57%]"}
              classChtName={"xl:!text-base"}
              classImg={"lg:!h-[64px] lg:!w-[64px] xl:!h-[70px] xl:!w-[70px]"}
              btnText={`Chat`}
              classBtn={`!w-4/5 md:!w-full`}
              classBtnBox={"!w-[43%] md:!w-[26%] lg:!w-[30%]"}
              classBtnTwo={"hidden !w-4/5 md:!w-full"}
              chatLink="#"
              disableBtn={""}
              clickAct={() => handleActiveChatGrp(item)}
            />
          ))}
        </SimpleBar>
        {/* <SimpleBar className="flex flex-col px-2 max-h-[350px] xl:max-h-[25vh] lg:h-[265px] xl:h-auto px-1">
          {myGroupList.length + joinedGroupList.length < 1 ? (
            <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 text-sm md:text-[15px] text-black rounded-md w-[85%] lg:w-full m-auto">
              You haven't joined or created any groups yet.
            </p>
          ) : (
            myGroupList.map((item) => (
              <ChatDisplayMin
                avatarPath={"images/grp_avatar_1.png"}
                avatarAlt={"grp_avatar_1"}
                classAvatar={
                  "xl:!mr-1 !w-1/5 md:!w-[15%] lg:!w-[20%] xl:!w-[23%]"
                }
                chatName={item.grpName}
                message={item.grpTag}
                messageFooter={`Admin: ${item.adminName}`}
                classTextBox={"md:!w-[79%] lg:!w-[59%] xl:!w-[57%]"}
                classChtName={"xl:!text-base"}
                classImg={"lg:!h-[64px] lg:!w-[64px] xl:!h-[70px] xl:!w-[70px]"}
                btnText={`Message`}
                classBtn={`!w-4/5 md:!w-full`}
                classBtnBox={"!w-[43%] md:!w-[26%] lg:!w-[40%]"}
                classBtnTwo={"hidden !w-4/5 md:!w-full"}
                chatLink="#"
                disableBtn={""}
                clickAct={() => handleActiveChatGrp(item)}
              />
            ))
          )}
        </SimpleBar> */}
      </div>
    </>
  );
};

export default GroupsField;
