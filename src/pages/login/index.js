import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getDatabase();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const refEmail = useRef(null);
  const refPass = useRef(null);
  const refForgotPass = useRef(null);
  const refForgotPassToggler = useRef(null);

  let [isFocusedEmail, setIsFocusedEmail] = useState(false);
  let [isFocusedPass, setIsFocusedPass] = useState(false);

  let [passVisibility, setPassVisibility] = useState(false);

  let [showForgot, setShowForgot] = useState(false);

  let [loading, setLoading] = useState(false);

  let [loadingForgot, setLoadingForgot] = useState(false);

  let [userEmail, setUserEmail] = useState("");
  let [userPass, setUserPass] = useState("");

  let [forgotEmail, setForgotEmail] = useState("");

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let [errEmail, setErrEmail] = useState("");
  let [errPass, setErrPass] = useState("");

  let [errForgot, setErrForgot] = useState("");

  let [fErrEmail, setFErrEmail] = useState("");
  let [fErrPass, setFErrPass] = useState("");
  let [fErrForgot, setFErrForgot] = useState("");

  let [successMsg, setSuccessMsg] = useState("");

  let [successForgot, setSuccessForgot] = useState("");

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
    refEmail.current.focus();
  };

  useEffect(() => {
    document.activeElement === refEmail.current && setIsFocusedEmail(true);
  }, []);

  const handleFocusPass = () => {
    setIsFocusedPass(true);
    refPass.current.focus();
  };

  const handleBlurEmail = () => {
    refEmail.current.value === "" && setIsFocusedEmail(false);
  };
  const handleBlurPass = () => {
    refPass.current.value === "" && setIsFocusedPass(false);
  };

  const passShowHide = () => {
    setPassVisibility(!passVisibility);
  };

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
    setErrEmail("");
    setFErrEmail("");
    setSuccessMsg("");
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
    setErrPass("");
    setFErrPass("");
    setSuccessMsg("");
  };

  const handleForgotEmail = (e) => {
    setForgotEmail(e.target.value);
    setErrForgot("");
    setFErrForgot("");
    setSuccessForgot("");
  };

  const handleShowForgot = () => {
    setShowForgot(true);
  };

  const handleClickOutside = (e) => {
    if (
      !refForgotPass.current.contains(e.target) &&
      refForgotPassToggler.current !== e.target
    ) {
      setShowForgot(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    refEmail.current.value !== "" && setIsFocusedEmail(true);
    refPass.current.value !== "" && setIsFocusedPass(true);
  }, []);

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrForgot("You must enter your email address!");
    } else if (!validEmail.test(forgotEmail)) {
      setErrForgot("You must enter a valid email address!");
    } else {
      setLoadingForgot(true);
      sendPasswordResetEmail(auth, forgotEmail)
        .then(() => {
          console.log("Password reset email sent!");
          setSuccessForgot(
            "Now pls check your email address. We've sent a password reset email there."
          );
          setLoadingForgot(false);
          setTimeout(() => {
            setLoadingForgot(false);
            setShowForgot(false);
          }, 2000);
        })
        .catch((error) => {
          setLoadingForgot(false);
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/user-not-found")) {
            setFErrForgot("User not found! Enter your email correctly.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setFErrForgot("Network error! Check your connection pls.");
          }
        });
    }
  };

  let handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((userCredential) => {
      // const user = userCredential.user;
      updateProfile(auth.currentUser, {
        photoURL: "images/default_avatar.png",
      }).then(() => {
        const user = auth.currentUser;
        let userRef = ref(db, "users/" + user.uid);
        set(userRef, {
          fullName: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
        }).then(() => {
          dispatch(userLoginInfo(user));
          localStorage.setItem("userLoginInfo", JSON.stringify(user));
          navigate("/");
        });
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      setErrEmail("You must enter your email address!");
    } else if (!validEmail.test(userEmail)) {
      setErrEmail("You must enter a valid email address!");
    }

    if (!userPass) {
      setErrPass("You must enter your password!");
    }

    if (userEmail && validEmail.test(userEmail) && userPass) {
      setLoading(true);
      signInWithEmailAndPassword(auth, userEmail, userPass)
        .then((userCredential) => {
          // Signed in
          console.log("logged in!");
          const user = userCredential.user;
          setSuccessMsg(
            "Credentials matched successfully! We're redirecting you to the homepage..."
          );
          dispatch(userLoginInfo(user));
          localStorage.setItem("userLoginInfo", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
            setLoading(false);
          }, 1500);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setFErrEmail(
              "User not found! Enter your email correctly or sign up first if you are new here."
            );
          } else if (errorCode.includes("auth/wrong-password")) {
            setFErrPass("Wrong password! Try again pls.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setFErrPass("Network error! Check your connection pls.");
          }
          console.log(errorCode);
          // const errorMessage = error.message;
        });
    }
  };

  return (
    <div className="flex items-center font-open">
      <div className="w-full lg:w-[52%] lg:scale-90 xl:scale-100 text-secondary h-[90vh] lg:h-screen flex flex-col justify-center items-center">
        {/* logo */}
        <picture className="w-[75px] h-[75px] mt-10 md:mt-14 md:scale-[160%] border !border-1 mb-6 md:mb-[80px] lg:hidden rounded-full border-photoUp/70 p-2.5 pr-4 pt-4 self-center">
          <img
            className="w-full h-full"
            src="images/logo.png"
            loading="lazy"
            alt=""
          />
        </picture>
        {/* logo */}

        <div className="lg:mt-12 flex flex-col items-center">
          <h1 className="text-2xl md:text-[40px] lg:text-3xl xl:text-[34px] text-center lg:text-left font-bold lg:self-start">
            Login to your account!
          </h1>

          {/* google login button */}
          <a
            className="text-[11px] md:text-sm font-semibold mt-5 md:mt-9 lg:mt-7 xl:mt-9 mb-10 md:mb-12 lg:mb-8 xl:mb-10 inline-block pl-3 md:pl-6 lg:pl-5 xl:pl-6 pr-4 md:pr-8 lg:pr-7 xl:pr-8 py-2.5 md:py-5 lg:py-4 xl:py-5 rounded-[14px] md:rounded-lg lg:self-start border-2 border-secondary/20 hover:border-secondary/60 linear duration-300 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <button className="flex items-center gap-2">
              <FcGoogle className="text-base md:text-[22px]" /> Login with
              Google
            </button>
          </a>
          {/* google login button */}

          <div className="w-[255px] md:w-[380px] lg:w-[400px] flex flex-col m-auto items-center lg:items-start">
            {/* ========== login form starts ========== */}
            <form
              action="#"
              method="POST"
              className="flex flex-col gap-y-8 md:gap-y-12 lg:gap-y-8 xl:gap-y-10 w-full md:w-[400px] lg:w-[360px] xl:w-[370px] mb-4 xl:mb-6"
            >
              <div className="relative" onClick={handleFocusEmail}>
                <input
                  type={"email"}
                  className="w-full lg:w-[90%] py-3.5 md:py-6 lg:py-5 px-[2px] md:px-1 text-[15px] md:text-xl lg:text-lg xl:text-xl border-b-[2px] border-focusSec font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                  ref={refEmail}
                  onBlur={handleBlurEmail}
                  onChange={handleEmail}
                  autoFocus
                />
                <p
                  className={`${
                    isFocusedEmail
                      ? "opacity-80 top-[-12px] md:top-[-8px] text-[11px] md:text-sm"
                      : "opacity-50 text-[15px] md:text-lg top-[14px] md:top-[19px]"
                  }  font-semibold absolute left-[2px] md:left-[4px] linear duration-300`}
                >
                  Email Address
                </p>
                {errEmail != "" && (
                  <p className="lg:pt-[1px] text-[13px] md:text-base lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {errEmail}
                  </p>
                )}
                {fErrEmail != "" && (
                  <p className="lg:pt-[1px] text-[13px] md:text-base lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {fErrEmail}
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
                  className="w-full lg:w-[90%] py-3.5 md:py-6 lg:py-5 px-[2px] md:px-1 text-[15px] md:text-xl lg:text-lg xl:text-xl pr-9 md:pr-[50px] lg:pr-12 border-b-[2px] border-focusSec font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                  ref={refPass}
                  onChange={handlePass}
                />
                <p
                  className={`${
                    isFocusedPass
                      ? "opacity-80 top-[-12px] md:top-[-8px] text-[11px] md:text-sm"
                      : "opacity-50 text-[15px] md:text-lg top-[14px] md:top-[19px]"
                  }  font-semibold absolute left-[2px] md:left-[4px] linear duration-300`}
                >
                  Password
                </p>
                {passVisibility ? (
                  <RiEyeFill
                    className="absolute top-[16px] md:top-6 lg:top-5 right-2 md:right-3 lg:right-12 text-[22px] md:text-[28px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                    onClick={passShowHide}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="absolute top-[16px] md:top-6 lg:top-5 right-2 md:right-3 lg:right-12 text-[22px] md:text-[28px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                    onClick={passShowHide}
                  />
                )}
                {errPass != "" && (
                  <p className="lg:pt-[1px] text-[13px] md:text-base lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {errPass}
                  </p>
                )}
                {fErrPass != "" && (
                  <p className="lg:pt-[1px] text-[13px] md:text-base lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {fErrPass}
                  </p>
                )}
                {successMsg != "" && (
                  <p className="mt-4 md:mt-8 px-2 py-[2px] md:py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-xs md:text-lg lg:text-base xl:text-lg font-semibold animate-[popDown_.4s_ease_1]">
                    {successMsg}
                  </p>
                )}
              </div>

              <Button
                customClass={`py-3.5 md:py-6 lg:py-5 lg:py-5 w-full lg:w-full block xl:w-full text-[15px] md:text-xl lg:text-lg xl:text-xl rounded-[10px] font-semibold mb-2 md:mb-5 lg:mt-2 xl:mt-0 ${
                  loading && "!pt-[14px] !pb-[10px] md:!pt-6 md:!pb-4"
                }`}
                goTo={"#"}
                text={!loading && "Login to Continue"}
                btnDisable={loading}
                clickAct={handleSubmit}
                Loader={PulseLoader}
                loaderColor="#fff"
                loadingStatus={loading}
                loaderMargin={3}
              />
            </form>
            {/* ========== login form ends ========== */}

            <p
              className="text-yellow font-semibold text-[13px] md:text-[17px] lg:text-sm xl:text-base  text-center cursor-pointer hover:text-yellowHover linear duration-300 self-center lg:mr-9"
              onClick={handleShowForgot}
              ref={refForgotPassToggler}
            >
              Forgot password?
            </p>

            {/* ========== forgot pass modal starts ========== */}
            <div
              className={`fixed top-0 left-0 lg:left-4 xl:left-0 w-screen lg:scale-[114%] xl:scale-[100%] h-full bg-black/70 z-10 ${
                showForgot ? "block" : "hidden"
              } animate-[smooth_.4s_ease_1] grid place-items-center`}
            >
              <div
                className="relative w-4/5 md:w-4/6 lg:w-[45%] xl:w-2/5 bg-white text-center py-8 md:py-10 lg:py-8 xl:py-12 px-6 md:px-12 rounded-lg animate-[slideX_.4s_ease_1]"
                ref={refForgotPass}
              >
                <h2 className="text-primaryTwo text-[22px] md:text-4xl lg:text-[28px] xl:text-4xl leading-none font-semibold mb-6 md:mb-8 xl:mb-10">
                  Forgot Password?
                </h2>
                <p className="mb-5 md:mb-8 lg:mb-6 xl:mb-8 font-semibold text-[13px] md:text-lg lg:text-[16px] xl:text-lg text-[#341a91]">
                  To reset your password, enter your email address first.
                </p>
                <form className="m-auto">
                  <input
                    type={"email"}
                    className="w-full px-1 py-3 md:py-5 border-b-[2px] border-focusSec text-[15px] md:text-xl lg:text-lg xl:text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                    onChange={handleForgotEmail}
                    placeholder="Email Address"
                  />
                  {errForgot !== "" && (
                    <p className="pt-[1px] text-[13px] md:text-lg lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                      {errForgot}
                    </p>
                  )}
                  {fErrForgot !== "" && (
                    <p className="pt-[1px] text-[13px] md:text-lg lg:text-sm xl:text-base lg:pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1] text-left">
                      {fErrForgot}
                    </p>
                  )}
                  {successForgot !== "" && (
                    <p className="mt-4 px-2 py-[2px] md:py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-xs md:text-lg font-semibold animate-[popDown_.4s_ease_1]">
                      {successForgot}
                    </p>
                  )}
                  <AiOutlineCloseCircle
                    className="text-[26px] md:text-[40px] lg:text-4xl xl:text-[40px] mr-[6px] mt-[7px] text-primaryTwo/50 hover:text-primaryTwo/80 linear duration-300 rounded-full font-bold cursor-pointer absolute top-0 right-0"
                    onClick={() => {
                      setErrForgot("");
                      setFErrForgot("");
                      setShowForgot(false);
                    }}
                  />
                  <Button
                    customClass={
                      "py-3.5 md:py-6 lg:py-5 lg:py-5 w-full lg:w-[95%] block lg:w-full text-[15px] md:text-xl lg:text-lg xl:text-xl rounded-[10px] font-semibold mt-6 md:mt-12"
                    }
                    text={!loadingForgot && "Next"}
                    btnDisable={loadingForgot}
                    clickAct={handleForgotSubmit}
                    Loader={PulseLoader}
                    loaderColor="#fff"
                    loadingStatus={loadingForgot}
                    loaderSize={13}
                    loaderMargin={2.5}
                  />
                </form>
              </div>
            </div>
            {/* ========== forgot pass modal ends ========== */}

            <p className="text-secondary text-[13px] md:text-[17px] lg:text-sm xl:text-[15px] text-center mt-2 xl:mt-4 self-center lg:mr-10">
              Don’t have an account ?{" "}
              <Link
                to="/registration"
                className="text-yellow font-semibold hover:text-yellowHover linear duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[48%] hidden lg:block h-screen">
        <picture className="w-full h-full">
          <img
            className="h-screen w-full object-cover"
            src="images/signin.webp"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Login;
