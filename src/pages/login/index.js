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

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getDatabase();

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
  });

  const handleFocusPass = () => {
    setIsFocusedPass(true);
    refPass.current.focus();
  };

  const handleBlurEmail = () => {
    refEmail.current.value == "" && setIsFocusedEmail(false);
  };
  const handleBlurPass = () => {
    refPass.current.value == "" && setIsFocusedPass(false);
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
    signInWithPopup(auth, provider).then(() => {
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
          console.log(user.displayName);
          setSuccessMsg(
            "Credentials matched successfully! We're redirecting you to the homepage..."
          );
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
      <div className="w-[52%] text-secondary h-screen flex flex-col justify-center items-center">
        <div className="mt-12">
          <h1 className="text-[34px] font-bold">Login to your account!</h1>
          <a
            className="text-sm font-semibold mt-9 mb-10 inline-block pl-6 pr-10 py-5 rounded-lg border-2 border-secondary/20 hover:border-secondary/60 linear duration-300 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <button className="flex items-center gap-2">
              <FcGoogle className="text-[22px]" /> Login with Google
            </button>
          </a>

          <div className="w-[420px] ">
            {/* ========== login form starts ========== */}
            <form
              action="#"
              method="POST"
              className="flex flex-col gap-14 mb-12"
            >
              <div className="relative" onClick={handleFocusEmail}>
                <input
                  type={"email"}
                  className="w-[90%] px-1 py-5 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                  ref={refEmail}
                  onBlur={handleBlurEmail}
                  onChange={handleEmail}
                  autoFocus
                />
                <p
                  className={`${
                    isFocusedEmail
                      ? "opacity-80 top-[-10px] text-sm"
                      : "opacity-50 px-0 text-lg top-[19px]"
                  }  font-semibold absolute left-[4px] linear duration-300`}
                >
                  Email Address
                </p>
                {errEmail != "" && (
                  <p className="pt-[3px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {errEmail}
                  </p>
                )}
                {fErrEmail != "" && (
                  <p className="pt-[3px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
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
                  className="w-[90%] px-1 py-5 pr-12 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                  ref={refPass}
                  onChange={handlePass}
                />
                <p
                  className={`${
                    isFocusedPass
                      ? "opacity-80 top-[-10px] text-sm"
                      : "opacity-50 px-0 text-lg top-[19px]"
                  }  font-semibold absolute left-[4px] linear duration-300`}
                >
                  Password
                </p>
                {passVisibility ? (
                  <RiEyeFill
                    className="absolute top-5 right-12 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                    onClick={passShowHide}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="absolute top-5 right-12 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                    onClick={passShowHide}
                  />
                )}
                {errPass != "" && (
                  <p className="pt-[3px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {errPass}
                  </p>
                )}
                {fErrPass != "" && (
                  <p className="pt-[3px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    {fErrPass}
                  </p>
                )}
                {successMsg != "" && (
                  <p className="mt-8 px-2 py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-lg font-semibold animate-[popDown_.4s_ease_1]">
                    {successMsg}
                  </p>
                )}
              </div>

              <Button
                customClass={`py-7 w-full text-xl rounded-lg font-semibold ${
                  loading && "pt-8 pb-6"
                }`}
                goTo={"#"}
                text={!loading && "Login to Continue"}
                btnDisable={loading}
                clickAct={handleSubmit}
                Loader={PulseLoader}
                loaderColor="#fff"
                loaderCss={`fontSize: '110px'`}
                loadingStatus={loading}
                loaderMargin={3}
              />
            </form>
            {/* ========== login form ends ========== */}

            <p
              className=" text-yellow font-semibold text-center cursor-pointer hover:text-yellowHover linear duration-300"
              onClick={handleShowForgot}
              ref={refForgotPassToggler}
            >
              Forgot password?
            </p>

            {/* ========== forgot pass modal starts ========== */}
            <div
              className={`fixed top-0 left-0 w-full h-full bg-black/70 z-10 ${
                showForgot ? "block" : "hidden"
              } animate-[smooth_.4s_ease_1] grid place-items-center`}
            >
              <div
                className="relative w-2/5 bg-white text-center py-12 px-6 rounded-lg animate-[slideX_.4s_ease_1]"
                ref={refForgotPass}
              >
                <h2 className="text-primaryTwo text-4xl leading-none  font-semibold mb-12">
                  Forgot Password?
                </h2>
                <p className="mb-9 font-semibold text-lg text-[#341a91]">
                  To reset your password, enter your email address first.
                </p>
                <form className="w-4/5 m-auto">
                  <input
                    type={"email"}
                    className="w-full px-1 py-5 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10 mb-1"
                    onChange={handleForgotEmail}
                    placeholder="Email Address"
                  />
                  {errForgot !== "" && (
                    // <p className="pt-1 pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                    <p className="absolute left-[85px] bg-[red]/20 border-2 border-[red] px-2 pb-1 rounded opacity- text-[red]/90 font-semibold animate-[popUp_.4s_ease_1]">
                      {errForgot}
                    </p>
                  )}
                  {fErrForgot !== "" && (
                    <p className="pt-1 pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {fErrForgot}
                    </p>
                  )}
                  {successForgot !== "" && (
                    <p className="mt-8 px-1 py-1 text-[green] bg-[green]/20 border-[1px] border-[green] rounded-md text-lg font-semibold animate-[popDown_.4s_ease_1]">
                      {successForgot}
                    </p>
                  )}
                  <AiOutlineCloseCircle
                    className="text-[40px] mr-[6px] mt-[7px] text-primaryTwo/50 hover:text-primaryTwo/80 linear duration-300 rounded-full font-bold cursor-pointer absolute top-0 right-0"
                    onClick={() => {
                      setErrForgot("");
                      setFErrForgot("");
                      setShowForgot(false);
                    }}
                  />
                  <Button
                    customClass={
                      "py-6 mt-10 w-full text-[22px] rounded-lg font-semibold"
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

            <p className="text-secondary text-[15px] text-center mt-4">
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
      <div className="w-[48%] h-screen">
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
