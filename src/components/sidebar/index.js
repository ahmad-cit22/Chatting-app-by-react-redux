import React, { useEffect, useRef, useState } from "react";
import { VscHome } from "react-icons/vsc";
import { TbMessageCircle, TbSettings } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { ImCamera } from "react-icons/im";
import SidebarMenu from "../sidebarMenu";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../button";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { SyncLoader } from "react-spinners";
import { getDatabase, update } from "firebase/database";

const Sidebar = ({ activePage }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const db = getDatabase();

  const active = activePage;

  const refPhotoUpload = useRef(null);
  const cropperRef = useRef(null);
  const photoForm = useRef(null);
  // const refPhotoUploadToggler = useRef(null);
  // const refPhotoUploadIcon = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");
  const [cropper, setCropper] = useState();
  const [previewImg, setPreviewImg] = useState("");

  const [successUpload, setSuccessUpload] = useState("");
  const [uploadErrMsg, setUploadErrMsg] = useState("");
  const [fErrUpload, setFErrUpload] = useState("");

  const photoUploadShow = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
  const handlePhotoUpload = (e) => {
    const storageRef = ref(storage, imgName);
    e.preventDefault();

    if (img !== "") {
      setLoadingUpload(true);
      if (typeof cropper !== "undefined") {
        cropper.getCroppedCanvas().toDataURL();
        const message = cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message, "data_url")
          .then((snapshot) => {
            console.log(snapshot);
            getDownloadURL(storageRef).then((downloadURL) => {
              console.log("File available at", downloadURL);
              // const userRef = ref(db, "users/" + auth.currentUser.uid);
              // update(userRef, {
              //   profile_picture: downloadURL,
              // })
              //   .then(() => {
              //     console.log("realtime done");
              //   })
              // .then(() => {
              // })
              updateProfile(auth.currentUser, {
                photoURL: downloadURL,
              })
                .then(() => {
                  console.log("URL Updated!");
                  setSuccessUpload("Photo Uploaded Successfully!");
                  setLoadingUpload(false);
                  setTimeout(() => {
                    setShowModal(false);
                    setUploadErrMsg("");
                    setFErrUpload("");
                    setSuccessUpload("");
                    setImg("");
                    setPreviewImg("");
                    photoForm.current.reset();
                  }, 2000);
                })
                .catch((error) => {
                  setLoadingUpload(false);
                  setFErrUpload(error.code);
                })
                .catch((error) => {
                  setLoadingUpload(false);
                  setFErrUpload(error.code);
                });
            });
          })
          .catch((error) => {
            setLoadingUpload(false);
            setFErrUpload(error.code);
          });
      }
    } else {
      setUploadErrMsg("No Photo Selected!");
    }
  };
  // const handleClickOutside = (e) => {
  //   if (
  //     !refPhotoUpload.current.contains(e.target) &&
  //     refPhotoUploadToggler.current !== e.target
  //   ) {
  //     setShowModal(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  // }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="w-[13%] py-10 bg-primary h-full rounded-lg flex flex-col gap-y-[78px]">
      <div className="w-full overflow-hidden gap-y-8 flex flex-col items-center justify-start group">
        <div className="pb-10 flex flex-col items-center gap-y-4 relative w-full">
          <picture className="rounded-full overflow-hidden h-[100px] border-[3.4px] border-white flex justify-center items-center bg-white">
            <img
              width={100}
              height={100}
              src={auth.currentUser.photoURL}
              loading="lazy"
              alt="sidebar_avatar"
            />
          </picture>
          <button
            className="absolute bottom-[82px] z-10 right-10 bg-white rounded-full inline-block p-[6px] border-[2.5px] border-photoUp text-primaryTwo hover:bg-primary hover:border-white hover:text-white linear duration-300 hidden group-hover:block animate-[popUp_.3s_ease_1]"
            onClick={photoUploadShow}
          >
            <ImCamera className="text-sm" />
          </button>
          <h3 className="text-white text-xl font-semibold text-center">
            {auth.currentUser.displayName}
          </h3>
        </div>

        <SidebarMenu
          customClass={`${
            active === "home"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={VscHome}
          goTo={"/"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "messages"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbMessageCircle}
          goTo={"/messages"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "notifications"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={BsBell}
          goTo={"/notifications"}
        ></SidebarMenu>
        <SidebarMenu
          customClass={`${
            active === "settings"
              ? "before:block after:block text-primaryTwo"
              : "after:hidden before:hidden text-white/70 hover:text-white"
          }`}
          Icon={TbSettings}
          goTo={"/settings"}
        ></SidebarMenu>
        <button
          className={`w-full z-10 relative py-[22px] text-[50px] flex justify-center cursor-pointer linear duration-300 after:w-[100%] after:h-full after:absolute after:bg-white after:content-[''] after:top-0 after:left-[14%] after:rounded-tl-[20px] after:rounded-bl-[20px] after:z-[-2] before:w-[22%] before:h-full before:absolute before:bg-primary before:content-[''] before:top-0 before:right-[-17%] before:rounded-tl-[12px] before:rounded-bl-[12px] before:z-[-1] before:shadow-[-2px_0_5px_0_rgba(0,0,0,.30)] !text-[47px] ml-2 mt-16 justify-self-end after:hidden before:hidden text-white/70 hover:text-white`}
        >
          <GoSignOut onClick={handleSignOut} />
        </button>
      </div>

      {/* ========== photo upload modal starts ========== */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/70 z-10 ${
          showModal ? "block" : "hidden"
        } animate-[smooth.3s_ease_1] grid place-items-center`}
      >
        <div
          className="relative w-2/5 bg-white text-center py-12 px-6 rounded-lg animate-[popUp_.3s_ease_1]"
          ref={refPhotoUpload}
        >
          <h2 className="text-primaryTwo text-[34px] leading-none font-semibold mb-12">
            Upload Profile Picture
          </h2>
          <div className="flex pl-16 items-center gap-x-6">
            <p className="text-lg font-semibold text-primary">
              Preview Image :
            </p>
            <div className="rounded-full overflow-hidden h-[100px] w-[100px] border-[1px] border-photoUp p-0 grid justify-center items-center">
              <picture>
                {img ? (
                  <img src={previewImg} loading={"lazy"} />
                ) : (
                  <img src={auth.currentUser.photoURL} loading={"lazy"} />
                )}
              </picture>
            </div>
          </div>
          <form className="w-4/5 m-auto" ref={photoForm}>
            <input
              type={"file"}
              className="w-full px-1 py-5 text-xl font-semibold outline-0 linear duration-300 z-10 mb-1"
              placeholder="Email Address"
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
                "py-6 mt-10 w-full text-[22px] rounded-lg font-semibold"
              }
              text={!loadingUpload && "Upload Photo"}
              btnDisable={loadingUpload}
              clickAct={handlePhotoUpload}
              Loader={SyncLoader}
              loaderColor="#fff"
              loadingStatus={loadingUpload}
              loaderSize={13}
              loaderMargin={2.5}
            />
          </form>
        </div>
      </div>
      {/* ========== photo upload modal ends ========== */}
    </div>
  );
};

export default Sidebar;
