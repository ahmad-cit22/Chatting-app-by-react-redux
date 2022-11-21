import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { getDatabase, push, ref, set } from "firebase/database";

const ChatField = () => {
  const db = getDatabase();
  const singleMsgRef = ref(db, "singleMsgs/");
  const groupMsgRef = ref(db, "groupMsgs/");

  const activeChatData = useSelector((state) => state.activeChatInfo.value);
  const userData = useSelector((state) => state.userLoginInfo.userInfo);

  const [msg, setMsg] = useState("");
  const [msgBlank, setMsgBlank] = useState(true);

  const handleMsg = (e) => {
    setMsg(e.target.value);
    console.log(msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg !== "") {
      if (activeChatData.status === "group") {
        set(push(groupMsgRef), {
          msg: msg,
          senderId: userData.uid,
          senderName: userData.displayName,
          senderEmail: userData.email,
          senderImg: userData.photoURL,
          receiverId: activeChatData.receiverId,
          receiverName: activeChatData.receiverName,
          receiverTag: activeChatData.receiverTag,
          receiverImg: activeChatData.receiverImg,
          msgTime: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        }).then(() => {
          console.log("done msg");
        });
      } else {
        set(push(singleMsgRef), {
          msg: msg,
          senderId: userData.uid,
          senderName: userData.displayName,
          senderEmail: userData.email,
          senderImg: userData.photoURL,
          receiverId: activeChatData.receiverId,
          receiverName: activeChatData.receiverName,
          receiverEmail: activeChatData.receiverEmail,
          receiverImg: activeChatData.receiverImg,
          msgTime: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        }).then(() => {
          console.log("done msg");
        });
      }
    }
  };

  return activeChatData !== null ? (
    <>
      <div className="py-[14px] flex items-center border-b-[.5px] justify-between shadow-md pr-4">
        <Link to={""} className={`w-[11%] md:w-[8%] lg:w-[11%] xl:w-[7%]`}>
          <picture
            className={`rounded-full overflow-hidden w-full border-[0px] border-photoUp flex justify-center items-center bg-white`}
          >
            <img
              src={activeChatData.receiverImg}
              className={"w-full"}
              loading="lazy"
              alt={"activeChat"}
            />
          </picture>
        </Link>
        <div className="flex justify-between w-[89%] md:w-[92%] lg:w-[89%] xl:w-[93%] items-center">
          <div className={`w-[55%] md:w-[77%] lg:w-[59%] pr-2 pl-4 `}>
            <Link to={""}>
              <p
                className={`text-sm md:text-[19px] pb-[1px] lg:text-sm xl:text-[17px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300`}
              >
                {activeChatData.receiverName}
              </p>
            </Link>
            <p
              className={`opacity-80 text-[11px] md:text-base lg:text-[11px] xl:text-[13px] truncate`}
            >
              Active Now
              {/* {activeChatData.receiverEmail
                 ? activeChatData.receiverEmail
                 : activeChatData.receiverTag} */}
            </p>
          </div>
          <div
            className={`flex gap-y-1 xl:gap-x-4 justify-center items-center font-semibold text-[12px] md:text-base lg:text-[13px] xl:text-2xl text-primary`}
          >
            <button
              className={`w-[78%] md:w-full break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
              // onClick={messageBtn ? clickActMsg : clickAct}
              // disabled={disableBtn}
            >
              <BsFillTelephoneFill />
            </button>
            <button
              className={`w-[78%] md:w-full break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
              // onClick={messageBtn ? clickActMsg : clickAct}
              // disabled={disableBtn}
            >
              <BsFillCameraVideoFill />
            </button>
            {/* <button
               className={`w-[78%] md:w-full break-words bg-primary/90 hover:bg-primary linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%] ${classBtnTwo}`}
               onClick={clickActTwo}
               disabled={disableBtnTwo}
             >
               {btnTwoText}
             </button> */}
          </div>
          {/*  <p
             className={`text-[10px] font-semibold opacity-50 last:justify-self-end ${classTime}`}
           >
             {subText}
           </p> */}
        </div>
      </div>
      <div className="h-full flex flex-col justify-end w-full">
        <div className="w-full flex flex-col items-start justify-center gap-y-2 first:mt-3">
          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              Hello Friend!
            </p>
          </div>
          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              How r u?
            </p>
          </div>
          <div className="max-w-[65%] self-end flex items-center justify-center gap-x-2 flex-row-reverse">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                // src={activeChatData.receiverImg}
                src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              Hey! I'm fine. What about you man?
            </p>
          </div>

          <div className="max-w-[65%] flex items-center justify-center gap-x-2">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                // src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              I'm also good :D
            </p>
          </div>

          <div className="max-w-[65%] self-end flex items-center justify-center gap-x-2 flex-row-reverse">
            <picture
              className={`rounded-full overflow-hidden h-[35px] w-[35px] bg-white`}
            >
              <img
                // src={activeChatData.receiverImg}
                src={userData.photoURL}
                className={"w-full"}
                loading="lazy"
                alt={"msgSenderAvatar"}
              />
            </picture>
            <p className="py-2 px-3 bg-hoverPrimary/10 text-black rounded-lg">
              What r u doing now?
            </p>
          </div>
        </div>

        {/* input box starts */}
        <div className="">
          <form className="flex gap-x-2 items-center justify-center">
            <input
              className="w-[94%] block py-3 px-5 rounded-full mt-6 border-[1px] border-primary/40 focus:border-photoUp/80 text-[17px] text-primary outline-0 linear duration-300"
              placeholder="Write Your Message"
              onChange={handleMsg}
            />
            <button
              className="pl-2 w-[6%] text-primary/60 hover:text-primary/90 text-[35px] leading-[15px] mt-6"
              onClick={handleSubmit}
            >
              <MdSend />
            </button>
          </form>
        </div>
        {/* input box ends */}
      </div>
    </>
  ) : (
    <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 xl:mt-14 text-sm md:text-[15px] text-black font-semibold rounded-md w-[65%] m-auto">
      Select a friend or group to start chatting
    </p>
  );
};

export default ChatField;