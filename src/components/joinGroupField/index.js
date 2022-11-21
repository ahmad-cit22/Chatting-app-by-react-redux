import React, { useState, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import Button from "../button";
import ChatDisplayMin from "../chatDisplayMin";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const JoinGroupField = () => {
  const auth = getAuth();
  const db = getDatabase();
  const userData = useSelector((state) => state.userLoginInfo.userInfo);
  const currentId = userData.uid;
  const groupsRef = ref(db, "groups/");
  const groupRequestsRef = ref(db, "groupRequests/");
  const groupMembersRef = ref(db, "groupMembers/");

  const refCreateGroupModal = useRef(null);
  const refCreateGroupFrom = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [grpNameErrMsg, setGrpNameErrMsg] = useState("");
  const [grpTagErrMsg, setGrpTagErrMsg] = useState("");
  const [grpNameFErrMsg, setGrpNameFErrMsg] = useState("");
  const [grpTagFErrMsg, setGrpTagFErrMsg] = useState("");
  const [grpSuccessMsg, setGrpSuccessMsg] = useState("");

  const [groupList, setGroupList] = useState([]);
  const [grpReqList, setGrpReqList] = useState([]);
  const [grpMemberList, setGrpMemberList] = useState([]);

  const [grpName, setGrpName] = useState("");
  const [grpTag, setGrpTag] = useState("");

  const handleShowCreateGroup = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setGrpNameErrMsg("");
    setGrpNameFErrMsg("");
    setGrpTagErrMsg("");
    setGrpTagFErrMsg("");
    setGrpSuccessMsg("");
  };

  const handleGName = (e) => {
    setGrpName(e.target.value);
    setGrpNameErrMsg("");
    setGrpNameFErrMsg("");
    setGrpSuccessMsg("");
  };

  const handleGTag = (e) => {
    setGrpTag(e.target.value);
    setGrpTagErrMsg("");
    setGrpTagFErrMsg("");
    setGrpSuccessMsg("");
  };

  const handleGrpSubmit = (e) => {
    e.preventDefault();
    if (!grpName) {
      setGrpNameErrMsg("You must enter a name for your group!");
    } else if (grpName.length > 25) {
      setGrpNameErrMsg("Group name can't contain more than 25 characters!");
    }

    if (!grpTag) {
      setGrpTagErrMsg("You must enter your group tag!");
    } else if (grpTag.length > 35) {
      setGrpTagErrMsg("Group tag can't contain more than 35 characters!");
    }

    if (grpName && grpTag && grpName.length < 26 && grpTag.length < 36) {
      setLoading(true);
      set(push(groupsRef), {
        grpName: grpName,
        grpTag: grpTag,
        grpImg: "images/grp_avatar_2.png",
        adminId: currentId,
        adminName: userData.displayName,
        adminEmail: userData.email,
        adminImg: userData.photoURL,
        createdAt: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
      })
        .then(() => {
          console.log("done g");
          setGrpSuccessMsg("Done! Group successfully created.");
          setIsCompleted(true);
          setTimeout(() => {
            setShowModal(false);
            setGrpName("");
            setGrpTag("");
            setGrpNameErrMsg("");
            setGrpNameFErrMsg("");
            setGrpTagErrMsg("");
            setGrpTagFErrMsg("");
            setGrpSuccessMsg("");
            setIsCompleted(false);
            setLoading(false);
            refCreateGroupFrom.current.reset();
          }, 1500);
        })
        .catch((err) => {
          console.log(err.code);
          setGrpTagFErrMsg(err.code);
        });
    }
  };

  const handleGroupReq = (item) => {
    set(push(groupRequestsRef), {
      senderId: currentId,
      senderName: userData.displayName,
      senderEmail: userData.email,
      senderImg: userData.photoURL,
      grpId: item.id,
      grpName: item.grpName,
      grpTag: item.grpTag,
      grpImg: item.grpImg,
      adminId: item.adminId,
      adminName: item.adminName,
      adminEmail: item.adminEmail,
      adminImg: item.adminImg,
      createdAt: item.createdAt,
    }).then(() => {
      console.log("done reg grp");
    });
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
        if (currentId !== item.val().adminId) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(arr);
    });

    onValue(groupRequestsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().senderId === currentId) {
          arr.push(item.val().grpId + item.val().senderId);
        }
      });
      setGrpReqList(arr);
    });

    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentId === item.val().memberId) {
          arr.push(item.val().grpId + item.val().memberId);
        }
      });
      setGrpMemberList(arr);
    });
  }, []);

  return (
    <>
      <div className="w-full py-1 lg:pb-3 xl:pb-1 px-3 relative bg-white drop-shadow-[0px_6px_4px_rgba(0,0,0,0.25)] xl:h-[36.5%] rounded-lg">
        <div className="flex justify-between items-center pb-5 mb-1 border-b-[3px] pr-2">
          <h3 className="text-xl md:text-2xl lg:text-xl font-semibold px-2">
            Join Groups
          </h3>
          <button
            className={`bg-primary/90 hover:bg-primary linear duration-300 text-[13px] md:text-[17px] lg:text-[14.5px] text-white font-semibold px-2 md:px-3 py-1 md:py-2 lg:py-1 rounded-md active:scale-[90%]`}
            onClick={handleShowCreateGroup}
          >
            Create Group
          </button>
          {/* <HiOutlineDotsVertical className="text-[22px] mr-1 !text-primaryTwo z-[2] text-black/80 cursor-pointer" /> */}
        </div>
        <SimpleBar className="flex flex-col px-2 max-h-[350px] xl:max-h-[25vh] lg:h-[265px] xl:h-auto px-1">
          {groupList.length < 1 ? (
            <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 text-sm md:text-[15px] text-black rounded-md w-[85%] lg:w-full m-auto">
              Groups created by others will be shown here.
            </p>
          ) : (
            groupList.map((item) => (
              <ChatDisplayMin
                avatarPath={item.grpImg}
                avatarAlt={"grp_avatar_1"}
                classAvatar={
                  "xl:!mr-1 !w-[18%] md:!w-[13%] lg:!w-[17%] xl:!w-[18%]"
                }
                chatName={item.grpName}
                message={item.grpTag}
                messageFooter={`Admin: ${item.adminName}`}
                classTextBox={
                  "w-[79%] md:!w-[79%] lg:!w-[59%] md:pl-5 lg:pl-3 xl:!w-[57%]"
                }
                classChtName={"xl:!text-base"}
                btnText={`${
                  grpReqList.includes(item.id + currentId)
                    ? "Request Sent"
                    : grpMemberList.includes(item.id + currentId)
                    ? "Joined"
                    : "Join"
                }`}
                classBtn={`${
                  grpReqList.includes(item.id + currentId) ||
                  grpMemberList.includes(item.id + currentId)
                    ? "!bg-white text-primaryTwo drop-shadow-lg"
                    : ""
                } !w-4/5 md:!w-full`}
                classBtnBox={"!w-[43%] md:!w-[26%] lg:!w-[41%]"}
                classBtnTwo={"hidden !w-4/5 md:!w-full"}
                chatLink="#"
                disableBtn={
                  grpReqList.includes(item.id + currentId) ||
                  grpMemberList.includes(item.id + currentId)
                    ? true
                    : false
                }
                clickAct={() => handleGroupReq(item)}
              />
            ))
          )}
        </SimpleBar>
      </div>

      {/* ========== Create Group modal starts ========== */}
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/70 z-[22] ${
          showModal ? "block" : "hidden"
        } animate-[smooth.3s_ease_1] grid place-items-center`}
      >
        <div
          className="relative w-2/5 bg-white text-center py-10 px-6 rounded-md animate-[popUp_.3s_ease_1]"
          ref={refCreateGroupModal}
        >
          <h2 className="text-primary text-2xl md:text-[32px] leading-none font-semibold mb-12">
            Create New Group
          </h2>
          <form className="w-4/5 m-auto" ref={refCreateGroupFrom}>
            <input
              type={"text"}
              className="w-full md:py-3 md:px-4 rounded-md border-[1.5px] border-primary text-lg text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
              placeholder="Group Name"
              onChange={handleGName}
            />
            {grpNameErrMsg !== "" && (
              <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                {grpNameErrMsg}
              </p>
            )}
            {grpNameFErrMsg !== "" && (
              <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                {grpNameFErrMsg}
              </p>
            )}

            <input
              type={"text"}
              className="w-full mt-4 md:py-3 md:px-4 rounded-md border-[1.5px] border-primary text-lg text-primary outline-0 focus:border-focus linear duration-300 z-10"
              placeholder="Group Tag"
              onChange={handleGTag}
            />

            {grpTagErrMsg !== "" && (
              <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                {grpTagErrMsg}
              </p>
            )}
            {grpTagFErrMsg !== "" && (
              <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                {grpTagFErrMsg}
              </p>
            )}
            {grpSuccessMsg !== "" && (
              <p className="pt-[3px] pl-1 text-lg text-[green] font-semibold animate-[popDown_.4s_ease_1] text-left">
                {grpSuccessMsg}
              </p>
            )}
            <RiCloseFill
              className={
                "text-[40px] mr-[1px] mt-[2px] text-primaryTwo/70 hover:text-primaryTwo linear duration-300 rounded-full font-semibold cursor-pointer absolute top-0 right-0"
              }
              onClick={closeModal}
            />
            <Button
              customClass={`${
                loading ? "opacity-70 hover:bg-primary" : ""
              } py-2 mt-8 w-[50%] text-xl leading-[40px] rounded-md font-semibold`}
              text={`${isCompleted ? "Done" : "Create Group"}`}
              btnDisable={loading}
              clickAct={handleGrpSubmit}
              Loader={BeatLoader}
              loadingStatus={false}
            />
          </form>
        </div>
      </div>
      {/* // ========== Create Group modal ends ==========  */}
    </>
  );
};

export default JoinGroupField;
