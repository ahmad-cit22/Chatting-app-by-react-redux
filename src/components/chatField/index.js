import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import SimpleBar from "simplebar-react";
import { activeChat } from "../../slices/activeChatSlice";

const ChatField = () => {
  const db = getDatabase();
  const singleMsgRef = ref(db, "singleMsgs/");
  const groupMsgRef = ref(db, "groupMsgs/");

  const dispatch = useDispatch();
  const activeChatData = useSelector((state) => state.activeChatInfo.value);
  const userData = useSelector((state) => state.userLoginInfo.userInfo);

  const [msg, setMsg] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [msgBlank, setMsgBlank] = useState(true);

  const msgFormRef = useRef(null);

  const [grpMsgs, setGrpMsgs] = useState([]);
  const [singleMsgs, setSingleMsgs] = useState([]);

  const messagesEndRef = useRef(null);

  const handleMsg = (e) => {
    setMsg(e.target.value);
    setMsgErr("");
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
          msgFormRef.current.reset();
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
          msgFormRef.current.reset();
          console.log("done msg");
        });
      }
    } else {
      setMsgErr("You can't send blank message!");
    }
  };

  useEffect(() => {
    if ((activeChatData !== null && activeChatData.status) === "group") {
      onValue(groupMsgRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (activeChatData.receiverId === item.val().receiverId) {
            arr.push({ ...item.val(), id: item.key });
          }
        });
        setGrpMsgs(arr);
      });
    } else if (activeChatData !== null && activeChatData.status === "single") {
      onValue(singleMsgRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (
            (activeChatData.receiverId === item.val().receiverId &&
              userData.uid === item.val().senderId) ||
            (activeChatData.receiverId === item.val().senderId &&
              userData.uid === item.val().receiverId)
          ) {
            arr.push({ ...item.val(), id: item.key });
          }
        });
        setSingleMsgs(arr);
      });
    }
  }, [activeChatData]);

  const scrollToBottom = () => {
    if (activeChatData !== null && grpMsgs.length !== 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [grpMsgs]);

  return activeChatData !== null ? (
    <>
      <div className="h-[10%] flex items-center justify-between shadow-md pr-2.5 md:pr-4 w-full bg-white z-10">
        <div className="w-[22%] md:w-[18%] lg:w-[10%] flex gap-x-2 md:gap-x-4 justify-between items-center">
          <button
            className="w-2/5 lg:hidden text-[28px] md:text-4xl text-primaryTwo"
            onClick={() => dispatch(activeChat(null))}
          >
            <IoIosArrowRoundBack />
          </button>
          <Link to={""} className={`w-3/5 lg:w-full`}>
            <picture
              className={`!rounded-full overflow-hidden h-[10vw] md:h-[7.5vw] lg:h-[2.7vw] xl:h-[3.7vw] w-[95%] md:w-[90%] lg:w-[75%] border-[0px] border-photoUp flex justify-center items-center bg-white`}
            >
              <img
                src={activeChatData.receiverImg}
                className={"w-full"}
                loading="lazy"
                alt={"activeChat"}
              />
            </picture>
          </Link>
        </div>
        <div className="flex justify-between w-[78%] md:w-[82%] lg:w-[89%] xl:w-[93%] items-center">
          <div
            className={`w-[55%] md:w-[77%] lg:w-[59%] pr-2 pl-3 md:pl-4 lg:pl-0 `}
          >
            <Link to={""}>
              <p
                className={`text-[13px] md:text-[19px] pb-[1px] lg:text-sm xl:text-[17px] break-words font-semibold hover:text-primaryTwo cursor-pointer linear duration-300`}
              >
                {activeChatData.receiverName}
              </p>
            </Link>
            <p
              className={`opacity-80 mt-0 md:mt-1 lg:mt-0 text-[10px] md:text-base lg:text-[11px] xl:text-[13px] truncate`}
            >
              Active Now
            </p>
          </div>
          <div
            className={`flex gap-y-1 gap-x-4 md:gap-x-6 justify-center items-center font-semibold text-lg md:text-2xl lg:text-[13px] xl:text-2xl text-primary`}
          >
            <button
              className={` break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
            >
              <BsFillTelephoneFill />
            </button>
            <button
              className={` break-words text-primaryTwo linear duration-300 px-[2px] py-[2px] md:py-[2px] lg:py-[0px] rounded-md active:scale-[90%]`}
            >
              <BsFillCameraVideoFill />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[90%] w-full flex flex-col">
        <SimpleBar className="h-[75vh] md:h-[78vh] lg:h-[76.5vh] lg:pr-2 ">
          <div className="w-[100%] flex flex-col items-start gap-y-2 first:mt-3">
            <div className="items-center flex flex-col w-full pt-24">
              <picture
                className={`rounded-full overflow-hidden h-[90px] w-[90px] md:!h-[100px] md:!w-[100px] bg-white`}
              >
                <img
                  src={activeChatData.receiverImg}
                  className={"w-full"}
                  loading="lazy"
                  alt={"msgSenderAvatar"}
                />
              </picture>
              <div className="text-center mt-4">
                <p className="text-2xl md:text-3xl font-semibold mb-2">
                  {activeChatData.receiverName}
                </p>
                <p className="text-sm md:text-base mb-2">
                  {activeChatData.status === "single"
                    ? activeChatData.receiverEmail
                    : activeChatData.receiverTag}
                </p>
                <p className="text-sm md:text-base mb-56">
                  {activeChatData.status === "single"
                    ? "You're friends on ChitChat."
                    : activeChatData.adminId === userData.uid
                    ? "You're an admin of this chat group."
                    : "You're a member in this chat group."}
                </p>
              </div>
            </div>
            {activeChatData !== null &&
              (activeChatData.status === "single"
                ? singleMsgs.map((item) => (
                    <div
                      className={`max-w-[75%] flex items-end justify-between gap-x-2 ${
                        item.senderId === userData.uid
                          ? "self-end flex-row-reverse animate-[popDown_.4s_ease_1]"
                          : "animate-[popUp_.4s_ease_1]"
                      }`}
                    >
                      <div className="w-[25px] md:!w-[35px] flex justify-center items-center">
                        <picture
                          className={`rounded-full overflow-hidden h-[25px] w-[25px] md:!h-[35px] md:!w-[35px] bg-white`}
                        >
                          <img
                            src={item.senderImg}
                            className={"w-full"}
                            loading="lazy"
                            alt={"msgSenderAvatar"}
                          />
                        </picture>
                      </div>
                      <p
                        className={`max-w-[95%] py-1.5 md:py-2 px-3 rounded-lg text-[13px] md:text-lg lg:text-base ${
                          item.senderId === userData.uid
                            ? "bg-primary/90 text-white"
                            : "bg-primary/10 text-black"
                        }`}
                      >
                        {item.msg}
                      </p>
                    </div>
                  ))
                : grpMsgs.map((item) => (
                    <div
                      className={`max-w-[75%] flex items-end justify-center gap-x-2 ${
                        item.senderId === userData.uid
                          ? "self-end flex-row-reverse animate-[popDown_.4s_ease_1]"
                          : "animate-[popUp_.4s_ease_1]"
                      }`}
                      ref={messagesEndRef}
                    >
                      <div className="w-[25px] md:!w-[35px] flex justify-center items-center">
                        <picture
                          className={`rounded-full overflow-hidden h-[25px] w-[25px] md:!h-[35px] md:!w-[35px] bg-white`}
                        >
                          <img
                            src={item.senderImg}
                            className={"w-full"}
                            loading="lazy"
                            alt={"msgSenderAvatar"}
                          />
                        </picture>
                      </div>
                      <p
                        className={`max-w-[95%] py-1.5 md:py-2 px-3 rounded-lg text-[13px] md:text-lg lg:text-base ${
                          item.senderId === userData.uid
                            ? "bg-primary/90 text-white"
                            : "bg-primary/10 text-black"
                        }`}
                      >
                        {item.msg}
                      </p>
                    </div>
                  )))}
          </div>
        </SimpleBar>

        {/* input box starts */}
        <div className="">
          <form
            className="flex gap-x-2 items-center justify-center pr-2"
            ref={msgFormRef}
          >
            <input
              className="w-[94%] block py-2 md:py-3 px-3 md:px-5 rounded-full mt-3 md:mt-6 border-[1px] border-primary/40 focus:border-photoUp/80 text-sm md:text-[17px] text-primary outline-0 linear duration-300"
              placeholder={`${msgErr !== "" ? msgErr : "Write Your Message"}`}
              onChange={handleMsg}
            />
            <button
              className="md:pl-2 w-[6%] text-primaryTwo/70 hover:text-primaryTwo text-2xl md:text-[35px] leading-[15px] mt-3 md:mt-6 linear duration-300 active:scale-90"
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

//thanks for watching
