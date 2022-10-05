import React, { useState, useRef } from "react";
import Button from "../../components/button";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  let [isFocusedEmail, setIsFocusedEmail] = useState(false);
  let [isFocusedName, setIsFocusedName] = useState(false);
  let [isFocusedPass, setIsFocusedPass] = useState(false);

  let [passVisibility, setPassVisibility] = useState(false);

  let [userEmail, setUserEmail] = useState("");
  let [userPass, setUserPass] = useState("");

  let [userRegEmail, setUserRegEmail] = useState("ahmad@1.com");
  let [userRegPass, setUserRegPass] = useState("Abc111@");

  let [errEmail, setErrEmail] = useState("");
  let [errPass, setErrPass] = useState("");
  let [successMsg, setSuccessMsg] = useState("");

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
    refEmail.current.focus();
  };
  const handleFocusName = () => {
    setIsFocusedName(true);
    refName.current.focus();
  };
  const handleFocusPass = () => {
    setIsFocusedPass(true);
    refPass.current.focus();
  };

  const handleBlurEmail = () => {
    refEmail.current.value == "" && setIsFocusedEmail(false);
  };
  const handleBlurName = () => {
    refName.current.value == "" && setIsFocusedName(false);
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
    setSuccessMsg("");
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
    setErrPass("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) {
      setErrEmail("You must enter your email address!");
    } else if (userEmail != userRegEmail) {
      setErrEmail("Email does not match with our records! Try again pls.");
    } else if (!userPass) {
      setErrPass("You must enter your password!");
    } else if (userPass != userRegPass) {
      setErrPass("Wrong password! Try again pls.");
    } else {
      setSuccessMsg("Log in done!");
    }
  };

  const refEmail = useRef(null);
  const refName = useRef(null);
  const refPass = useRef(null);

  return (
    <div className="flex items-center font-open">
      <div className="w-[52%] text-secondary h-screen flex flex-col justify-center items-center">
        <div className="mt-12">
          <h1 className="text-4xl font-bold">Login to your account!</h1>
          <a
            href="#"
            className="text-sm font-semibold mt-9 mb-10 inline-block pl-6 pr-10 py-5 rounded-lg border-2 border-secondary/20 hover:border-secondary/60 linear duration-300"
          >
            <button className="flex items-center gap-2">
              <FcGoogle className="text-[22px]" /> Login with Google
            </button>
          </a>

          <div className="w-[420px] ">
            <div>
              <form
                action="#"
                method="POST"
                className="flex flex-col gap-14 mb-9"
              >
                <div className="relative" onClick={handleFocusEmail}>
                  <input
                    type={"text"}
                    className="w-[90%] py-5 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                    ref={refEmail}
                    onBlur={handleBlurEmail}
                    onChange={handleEmail}
                  />
                  <p
                    className={`${
                      isFocusedEmail
                        ? "opacity-80 top-[-10px] text-sm"
                        : "opacity-50 px-0 text-lg top-[19px]"
                    }  font-semibold absolute linear duration-300`}
                  >
                    Email Address
                  </p>
                  {errEmail != "" && (
                    <p className="pt-[2px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errEmail}
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
                    className="w-[90%] py-5 pr-12 border-b-[2px] border-focusSec text-xl font-semibold outline-0 focus:border-secondary linear duration-300 z-10"
                    ref={refPass}
                    onChange={handlePass}
                  />
                  <p
                    className={`${
                      isFocusedPass
                        ? "opacity-80 top-[-10px] text-sm"
                        : "opacity-50 px-0 text-lg top-[19px]"
                    }  font-semibold absolute linear duration-300`}
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
                    <p className="pt-[2px] text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errPass}
                    </p>
                  )}
                  {successMsg != "" && (
                    <p className="py-[2px] text-[green]/90 text-lg font-semibold animate-[popDown_.4s_ease_1]">
                      {successMsg}
                    </p>
                  )}
                </div>

                <Button
                  customClass={"py-7 w-full text-xl rounded-lg font-semibold"}
                  goTo={"#"}
                  text={"Login to Continue"}
                  clickAct={handleSubmit}
                />
              </form>
            </div>

            <p className="text-secondary text-[15px]">
              Don’t have an account ?{" "}
              <Link to="/registration" className="text-yellow font-semibold">
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
