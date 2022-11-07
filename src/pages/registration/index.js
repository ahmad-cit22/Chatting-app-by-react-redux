import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { BeatLoader } from "react-spinners";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();

  const navigate = useNavigate();

  let [isFocusedEmail, setIsFocusedEmail] = useState(false);
  let [isFocusedName, setIsFocusedName] = useState(false);
  let [isFocusedPass, setIsFocusedPass] = useState(false);

  let [passVisibility, setPassVisibility] = useState(false);

  let [loading, setLoading] = useState(false);

  let [userRegEmail, setUserRegEmail] = useState("");
  let [userRegName, setUserRegName] = useState("");
  let [userRegPass, setUserRegPass] = useState("");

  let [errEmail, setErrEmail] = useState("");
  let [errName, setErrName] = useState("");
  let [errPass, setErrPass] = useState("");

  let [fErrEmail, setFErrEmail] = useState("");

  let [successMsg, setSuccessMsg] = useState("");

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validName = /^[A-z\s]+$/;
  const validPassU = /[A-Z]/;
  const validPassL = /[a-z]/;
  const validPassD = /[0-9]/;
  const validPassS = /[^\w]/;

  const validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w])/;

  const refEmail = useRef(null);
  const refName = useRef(null);
  const refPass = useRef(null);

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
    refEmail.current.focus();
  };

  useEffect(() => {
    document.activeElement === refEmail.current && setIsFocusedEmail(true);
  });

  const handleFocusName = () => {
    setIsFocusedName(true);
    refName.current.focus();
  };
  const handleFocusPass = () => {
    setIsFocusedPass(true);
    refPass.current.focus();
  };

  const handleBlurEmail = () => {
    refEmail.current.value === "" && setIsFocusedEmail(false);
  };
  const handleBlurName = () => {
    refName.current.value === "" && setIsFocusedName(false);
  };
  const handleBlurPass = () => {
    refPass.current.value === "" && setIsFocusedPass(false);
  };

  const handleEmail = (e) => {
    setUserRegEmail(e.target.value);
    setErrEmail("");
    setFErrEmail("");
    setSuccessMsg("");
  };
  const handleName = (e) => {
    setUserRegName(e.target.value);
    setErrName("");
    setSuccessMsg("");
  };
  const handlePass = (e) => {
    setUserRegPass(e.target.value);
    setErrPass("");
    setSuccessMsg("");
  };

  const passShowHide = () => {
    setPassVisibility(!passVisibility);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!userRegEmail) {
  //     setErrEmail("You must enter your email address!");
  //   } else if (!validEmail.test(userRegEmail)) {
  //     setErrEmail("You must enter a valid email address!");
  //   } else if (!userRegName) {
  //     setErrName("You must enter your full name!");
  //   } else if (!validName.test(userRegName)) {
  //     setErrName("Your name can't contain any number or special characters!");
  //   } else if (userRegName.split(" ").length < 2) {
  //     setErrName("You must enter both your first name and last name!");
  //   } else if (userRegName.length < 4) {
  //     setErrName("Your name must contain at least 4 characters!");
  //   } else if (!userRegPass) {
  //     setErrPass("You must create a password for your account!");
  //   } else if (!validPassU.test(userRegPass)) {
  //     setErrPass("Password must contain at least one uppercase character!");
  //   } else if (!validPassL.test(userRegPass)) {
  //     setErrPass("Password must contain at least one lowercase character!");
  //   } else if (!validPassD.test(userRegPass)) {
  //     setErrPass("Password must contain at least one digit!");
  //   } else if (!validPassS.test(userRegPass)) {
  //     setErrPass("Password must contain at least one special character!");
  //   } else if (userRegPass.length < 8 || userRegPass.length > 16) {
  //     setErrPass("Password length must be between 8 to 16 characters!");
  //   } else {
  //     createUserWithEmailAndPassword(auth, userRegEmail, userRegPass)
  //       .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         console.log(userCredential);
  //         console.log(user);
  //         // ...
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // ..
  //       });
  //     setSuccessMsg("Registration done!");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userRegEmail) {
      setErrEmail("You must enter your email address!");
    } else if (!validEmail.test(userRegEmail)) {
      setErrEmail("You must enter a valid email address!");
    }

    if (!userRegName) {
      setErrName("You must enter your full name!");
    } else if (!validName.test(userRegName)) {
      setErrName("Your name can't contain any number or special characters!");
    } else if (userRegName.split(" ").length < 2) {
      setErrName("You must enter both your first name and last name!");
    } else if (userRegName.length < 4) {
      setErrName("Your name must contain at least 4 characters!");
    }

    if (!userRegPass) {
      setErrPass("You must create a password for your account!");
    } else if (!validPassU.test(userRegPass)) {
      setErrPass("Password must contain at least one uppercase character!");
    } else if (!validPassL.test(userRegPass)) {
      setErrPass("Password must contain at least one lowercase character!");
    } else if (!validPassD.test(userRegPass)) {
      setErrPass("Password must contain at least one digit!");
    } else if (!validPassS.test(userRegPass)) {
      setErrPass("Password must contain at least one special character!");
    } else if (userRegPass.length < 8 || userRegPass.length > 16) {
      setErrPass("Password length must be between 8 to 16 characters!");
    }

    if (
      userRegEmail &&
      userRegName &&
      userRegPass &&
      validEmail.test(userRegEmail) &&
      validName.test(userRegName) &&
      userRegName.split(" ").length >= 2 &&
      userRegName.length > 4 &&
      validPass.test(userRegPass) &&
      userRegPass.length > 7 &&
      userRegPass.length < 17
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, userRegEmail, userRegPass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          updateProfile(auth.currentUser, {
            displayName: userRegName,
            photoURL: "images/default_avatar.png",
          })
            .then(() => {
              console.log("Profile Updated!");
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  console.log("sent");
                  setSuccessMsg(
                    "Registration successful! Check your email for the verification link."
                  );
                })
                .then(() => {
                  let userRef = ref(db, "users/" + user.uid);
                  set(userRef, {
                    fullName: user.displayName,
                    email: user.email,
                    profile_picture: user.photoURL,
                  }).then(() => {
                    console.log("done");
                    setTimeout(() => {
                      navigate("/login");
                      setLoading(false);
                    }, 1500);
                  });
                });
            })
            .catch((error) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFErrEmail("Sorry! This Email has already been registered.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setErrPass("Network error! Check your connection pls.");
          }
          console.log(errorCode);
          // const errorMessage = error.message;
        });
    }
    //  else {
    //    createUserWithEmailAndPassword(auth, userRegEmail, userRegPass)
    //      .then((userCredential) => {
    //        // Signed in
    //        const user = userCredential.user;
    //        console.log(userCredential);
    //        console.log(user);
    //        // ...
    //      })
    //      .catch((error) => {
    //        const errorCode = error.code;
    //        const errorMessage = error.message;
    //        // ..
    //      });
    // setSuccessMsg("Registration done!");
    //  }
  };

  return (
    <div className="flex items-center font-nunito">
      <div className="w-full lg:w-[52%] h-screen flex flex-col justify-center lg:items-end">
        <div className="lg:mt-12 lg:!mr-[70px]">
          <h1 className="text-[22px] md:text-4xl  lg:text-[27px] xl:text-[34px] text-center lg:text-left text-primary font-bold">
            Get started with easily register
          </h1>
          <p className="text-sm md:text-[22px] lg:text-xl text-center lg:text-left text-primary opacity-70 mt-1 md:max-lg:mt-3 xl:mt-2 mb-6 md:mb-12 lg:max-xl:mb-10">
            Free register and you can enjoy it!
          </p>

          <div className="lg:w-[368px] text-primary">
            {successMsg !== "" && (
              <p className="mb-8 px-2 py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-lg font-semibold animate-[popDown_.4s_ease_1]">
                {successMsg}
              </p>
            )}

            {/* ========== Registration form starts ========== */}
            <div>
              <form
                action="#"
                method="POST"
                className="flex flex-col gap-4 lg:gap-10 w-3/4 md:w-3/5 m-auto lg:w-[380px] mb-3 md:mb-4 lg:mb-6"
              >
                <div className="relative" onClick={handleFocusEmail}>
                  <input
                    type={"email"}
                    className="w-full md:py-6 md:px-12 rounded-lg border-[2.5px] border-primary text-[19px] text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
                    ref={refEmail}
                    onBlur={handleBlurEmail}
                    onChange={handleEmail}
                    autoFocus
                  />
                  <p
                    className={`${
                      isFocusedEmail
                        ? "top-[-10px] left-[30px] text-sm px-5 bg-white"
                        : "opacity-60 px-0 text-lg top-[25px] left-[49px]"
                    } text-primary font-semibold absolute linear duration-300`}
                  >
                    Email Address
                  </p>
                  {errEmail !== "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errEmail}
                    </p>
                  )}
                  {fErrEmail !== "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {fErrEmail}
                    </p>
                  )}
                </div>

                <div className="relative" onClick={handleFocusName}>
                  <input
                    type={"text"}
                    className="w-full md:py-6 md:px-12 rounded-lg border-[2.5px] border-primary text-[19px] text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
                    ref={refName}
                    onBlur={handleBlurName}
                    onChange={handleName}
                  />
                  <p
                    className={`${
                      isFocusedName
                        ? "top-[-10px] left-[30px] text-sm px-5 bg-white"
                        : "opacity-60 px-0 text-lg top-[25px] left-[49px]"
                    } text-primary font-semibold absolute linear duration-300`}
                  >
                    Full Name
                  </p>
                  {errName !== "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errName}
                    </p>
                  )}
                </div>

                <div
                  className="relative"
                  onClick={handleFocusPass}
                  onBlur={handleBlurPass}
                >
                  <input
                    type={`${passVisibility ? "text" : "password"}`}
                    className="w-full md:py-6 md:pl-12 md:pr-14 rounded-lg border-[2.5px] border-primary text-[19px] text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
                    ref={refPass}
                    onChange={handlePass}
                  />
                  <p
                    className={`${
                      isFocusedPass
                        ? "top-[-10px] left-[30px] text-sm px-5 bg-white"
                        : "opacity-60 px-0 text-lg top-[25px] left-[49px]"
                    } text-primary font-semibold absolute linear duration-300`}
                  >
                    Password
                  </p>
                  {passVisibility ? (
                    <RiEyeFill
                      className="absolute top-7 right-6 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                      onClick={passShowHide}
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="absolute top-7 right-6 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                      onClick={passShowHide}
                    />
                  )}
                  {errPass !== "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errPass}
                    </p>
                  )}
                </div>
                <div>
                  <Button
                    customClass={`py-5 w-full text-xl rounded-[86px] font-semibold mb-3 ${
                      loading && "pt-6 pb-4"
                    }`}
                    text={!loading && "Sign up"}
                    btnDisable={loading}
                    clickAct={handleSubmit}
                    Loader={BeatLoader}
                    loaderColor="#fff"
                    loadingStatus={loading}
                    loaderMargin={3}
                  />
                </div>
              </form>
              {/* ========== Registration form ends ========== */}
            </div>

            <p className="text-center text-secondary text-[16.5px]">
              Already have an account ?{" "}
              <Link to="/login" className="text-yellow font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[48%] hidden lg:block h-screen">
        <picture className="w-full h-full">
          <img
            className="h-screen w-full object-cover"
            src="images/signup.webp"
            loading="lazy"
            alt=""
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
