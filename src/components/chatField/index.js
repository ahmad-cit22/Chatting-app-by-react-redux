import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsImages } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadString,
} from "firebase/storage";
import { SyncLoader } from "react-spinners";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import SimpleBar from "simplebar-react";
import { activeChat } from "../../slices/activeChatSlice";

const ChatField = () => {
  const db = getDatabase();
  const storage = getStorage();
  const singleMsgRef = ref(db, "singleMsgs/");
  const groupMsgRef = ref(db, "groupMsgs/");

  const cropperRef = useRef(null);
  const photoForm = useRef(null);

  const dispatch = useDispatch();
  const activeChatData = useSelector((state) => state.activeChatInfo.value);
  const userData = useSelector((state) => state.userLoginInfo.userInfo);

  const [msg, setMsg] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [msgBlank, setMsgBlank] = useState(true);

  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [cropper, setCropper] = useState();
  const [previewImg, setPreviewImg] = useState("");

  const [successUpload, setSuccessUpload] = useState("");
  const [uploadErrMsg, setUploadErrMsg] = useState("");
  const [fErrUpload, setFErrUpload] = useState("");

  const [showModalImg, setShowModalImg] = useState(false);

  const msgFormRef = useRef(null);

  const [grpMsgs, setGrpMsgs] = useState([]);
  const [singleMsgs, setSingleMsgs] = useState([]);

  const grpMsgEndRef = useRef(null);
  const singleMsgEndRef = useRef(null);

  const handleMsg = (e) => {
    setMsg(e.target.value);
    setMsgErr("");
  };

  const scrollToBottomGrp = () => {
    if (activeChatData !== null && grpMsgEndRef.current !== null) {
      grpMsgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottomSingle = () => {
    if (activeChatData !== null && singleMsgEndRef.current !== null) {
      singleMsgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeModal = () => {
    setShowModalImg(false);
    setLoadingUpload(false);
    setUploadErrMsg("");
    setFErrUpload("");
    setSuccessUpload("");
    setImg("");
    setPreviewImg("");
    photoForm.current.reset();
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPreviewImg(cropper.getCroppedCanvas().toDataURL());
  };

  const handleSelectPhoto = (e) => {
    e.preventDefault();
    setUploadErrMsg("");

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setImgName(files[0].name);
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
        })
          .then(() => {
            msgFormRef.current.reset();
            setMsg("");
            console.log("done msg");
          })
          .catch((err) => {
            console.log(err.code);
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
        })
          .then(() => {
            msgFormRef.current.reset();
            setMsg("");
            console.log("done msg");
          })
          .catch((err) => {
            console.log(err.code);
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

  useEffect(() => {
    scrollToBottomGrp();
  }, [grpMsgs]);

  useEffect(() => {
    scrollToBottomSingle();
  }, [singleMsgs]);

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
        <SimpleBar className="h-[75vh] md:h-[78vh] lg:h-[76.5vh] lg:pr-2">
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
                <p className="text-2xl md:text-[26px] font-semibold mb-3">
                  {activeChatData.receiverName}
                </p>
                <p className="text-sm md:text-[15px] mb-1">
                  {activeChatData.status === "single"
                    ? activeChatData.receiverEmail
                    : activeChatData.receiverTag}
                </p>
                <p className="text-sm mb-[32vh]">
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
                          ? "self-end flex-row-reverse animate-[smooth_.6s_ease_1]"
                          : "animate-[popUp_.5s_ease_1]"
                      }`}
                      ref={singleMsgEndRef}
                    >
                      <div className="w-[25px] md:!w-[35px] flex justify-center items-center">
                        <picture
                          className={`rounded-full overflow-hidden h-[25px] w-[25px] md:!h-[30px] md:!w-[30px] bg-white`}
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
                      className={`max-w-[75%] flex items-end justify-center gap-x-2 relative bottom-0 ${
                        item.senderId === userData.uid
                          ? "self-end flex-row-reverse animate-[smooth_.6s_ease_1]"
                          : "animate-[popUp_.5s_ease_1]"
                      }`}
                      ref={grpMsgEndRef}
                    >
                      <div className="w-[25px] md:!w-[35px] flex justify-center items-center">
                        <picture
                          className={`rounded-full overflow-hidden h-[25px] w-[25px] md:!h-[30px] md:!w-[30px] bg-white`}
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
                        className={`max-w-[95%] py-1 px-3 rounded-lg text-[13px] md:text-lg lg:text-[15px] ${
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
            className="flex gap-x-2 items-center justify-center pr-0 lg:pr-2"
            ref={msgFormRef}
          >
            <div className="h-full w-[5%]">
              <BsImages
                className="mt-6 linear duration-300 text-2xl md:text-3xl text-primaryTwo/80 hover:text-primaryTwo active:scale-90 cursor-pointer"
                onClick={() => setShowModalImg(true)}
              />
            </div>
            <input
              className="w-[89%] block py-2 md:py-3 px-3 md:px-5 rounded-full mt-3 md:mt-6 border-[1px] border-primary/40 focus:border-photoUp/80 text-sm md:text-[17px] text-primary outline-0 linear duration-300"
              placeholder={`${msgErr !== "" ? msgErr : "Write Your Message"}`}
              onChange={handleMsg}
            />
            <button
              className="md:pl-2 w-[6%] text-primaryTwo/80 hover:text-primaryTwo text-2xl md:text-[35px] leading-[15px] mt-3 md:mt-6 linear duration-300 active:scale-90"
              onClick={handleSubmit}
            >
              <MdSend />
            </button>
          </form>
        </div>
        {/* input box ends */}

        {/* ========== img sending modal starts ========== */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black/70 z-10 ${
            showModalImg ? "block" : "hidden"
          } animate-[smooth.3s_ease_1] grid place-items-center`}
        >
          <div
            className="relative w-1/3 bg-white text-center py-12 px-6 rounded-lg animate-[popUp_.3s_ease_1]"
            // ref={refPhotoUpload}
          >
            <h2 className="text-primaryTwo text-3xl leading-none font-semibold mb-12">
              Send an Image
            </h2>
            <div className="flex pl-16 items-center gap-x-6">
              <p className="text-lg font-semibold text-primary">
                Preview Image :
              </p>
              <div className="rounded-full overflow-hidden h-[100px] w-[100px] border-[1px] border-photoUp p-0 grid justify-center items-center">
                {img ? (
                  <picture>
                    <img src={previewImg} loading={"lazy"} />
                  </picture>
                ) : (
                  <BsImages className="mt-6 text-2xl md:text-[100px] text-black/40" />
                )}
              </div>
            </div>
            <form className="w-4/5 m-auto" ref={photoForm}>
              <input
                type={"file"}
                className="w-full px-1 py-5 text-xl font-semibold outline-0 linear duration-300 z-10 mb-1"
                onChange={handleSelectPhoto}
              />
              <Cropper
                src={img}
                style={{
                  height: 270,
                  width: "90%",
                  margin: "auto",
                  display: img ? "block" : "none",
                }}
                // Cropper.js options
                initialAspectRatio={16 / 9}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              {uploadErrMsg !== "" && (
                <p className="absolute left-[85px] bottom-36 bg-[red]/20 inline-block border-2 border-[red] px-2 pb-1 rounded opacity- text-[red]/90 font-semibold animate-[popUp_.4s_ease_1] py-1">
                  {uploadErrMsg}
                </p>
              )}
              {fErrUpload !== "" && (
                <p className="pt-1 px-1 text-[red]/90 font-semibold inline-block animate-[popUpY_.4s_ease_1]">
                  {fErrUpload}
                </p>
              )}
              {successUpload !== "" && (
                <p className="mt-8 px-2 py-1 text-[green] inline-block bg-[green]/20 border-[1px] border-[green] rounded-md text-xl font-semibold animate-[popDown_.4s_ease_1]">
                  {successUpload}
                </p>
              )}
              <AiOutlineCloseCircle
                className="text-[38px] mr-[6px] mt-[7px] text-primaryTwo/70 hover:text-primaryTwo linear duration-300 rounded-full font-semibold cursor-pointer absolute top-0 right-0"
                onClick={closeModal}
              />
              <Button
                customClass={
                  "py-4 mt-10 w-full text-lg rounded-lg font-semibold"
                }
                text={!loadingUpload && "Send"}
                btnDisable={loadingUpload}
                // clickAct={handlePhotoUpload}
                Loader={SyncLoader}
                loaderColor="#fff"
                loadingStatus={loadingUpload}
                loaderSize={13}
                loaderMargin={2.5}
              />
            </form>
          </div>
        </div>
        {/* ========== img sending modal ends ========== */}
      </div>
    </>
  ) : (
    <p className="p-3 mb-7 lg:mb-0 md:p-4 text-center bg-primary/20 mt-8 xl:mt-14 text-sm md:text-[15px] text-black font-semibold rounded-md w-[65%] m-auto">
      Select a friend or group to start chatting
    </p>
  );
};

export default ChatField;
