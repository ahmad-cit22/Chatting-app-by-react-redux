import React, { useState, useRef } from "react";
import Button from "../../components/button";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Registration = () => {
  let [isFocusedEmail, setIsFocusedEmail] = useState(false);
  let [isFocusedName, setIsFocusedName] = useState(false);
  let [isFocusedPass, setIsFocusedPass] = useState(false);

  let [passVisibility, setPassVisibility] = useState(false);

  let [userRegEmail, setUserRegEmail] = useState("");
  let [userRegName, setUserRegName] = useState("");
  let [userRegPass, setUserRegPass] = useState("");

  let [errEmail, setErrEmail] = useState("");
  let [errName, setErrName] = useState("");
  let [errPass, setErrPass] = useState("");

  let [successMsg, setSuccessMsg] = useState("");

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validName = /^[A-z\s]+$/;
  const validPassU = /[A-Z]/;
  const validPassL = /[a-z]/;
  const validPassD = /[0-9]/;
  const validPassS = /[^\w]/;

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

  const handleEmail = (e) => {
    setUserRegEmail(e.target.value);
    setErrEmail("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRegEmail) {
      setErrEmail("You must enter your email address!");
    } else if (!validEmail.test(userRegEmail)) {
      setErrEmail("You must enter a valid email address!");
    } else if (!userRegName) {
      setErrName("You must enter your full name!");
    } else if (!validName.test(userRegName)) {
      setErrName("Your name can't contain any number or special characters!");
    } else if (userRegName.split(" ").length < 2) {
      setErrName("You must enter both your first name and last name!");
    } else if (userRegName.length < 4) {
      setErrName("Your name must contain at least 4 characters!");
    } else if (!userRegPass) {
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
    } else {
      setSuccessMsg("Registration done!");
    }
  };

  const refEmail = useRef(null);
  const refName = useRef(null);
  const refPass = useRef(null);

  return (
    <div className="flex items-center font-nunito">
      <div className="w-[52%] h-screen flex flex-col justify-center items-end">
        <div className="mt-12 mr-[70px]">
          <h1 className="text-4xl text-primary font-bold">
            Get started with easily register
          </h1>
          <p className="text-xl text-primary opacity-70 mt-3 mb-10">
            Free register and you can enjoy it!
          </p>

          <div className="w-[368px] text-primary">
            <div>
              <form
                action="#"
                method="POST"
                className="flex flex-col gap-10 w-[368px] mb-6"
              >
                <div className="relative" onClick={handleFocusEmail}>
                  <input
                    type={"text"}
                    className="w-full py-6 px-12 rounded-lg border-[2.5px] border-primary text-xl text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
                    ref={refEmail}
                    onBlur={handleBlurEmail}
                    onChange={handleEmail}
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
                  {errEmail != "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errEmail}
                    </p>
                  )}
                </div>

                <div className="relative" onClick={handleFocusName}>
                  <input
                    type={"text"}
                    className="w-full py-6 px-12 rounded-lg border-[2.5px] border-primary text-xl text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
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
                  {errName != "" && (
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
                    className="w-full py-6 pl-12 pr-14 rounded-lg border-[2.5px] border-primary text-xl text-primary font-semibold outline-0 focus:border-focus linear duration-300 z-10"
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
                      className="absolute top-7 right-5 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                      onClick={passShowHide}
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="absolute top-7 right-5 text-[26px] opacity-60 cursor-pointer hover:opacity-80 linear duration-300"
                      onClick={passShowHide}
                    />
                  )}
                  {errPass != "" && (
                    <p className="pt-[2px] pl-1 text-[red]/90 font-semibold animate-[popUpY_.4s_ease_1]">
                      {errPass}
                    </p>
                  )}
                  {successMsg != "" && (
                    <p className="py-[2px] pl-1 text-[green]/90 text-lg font-semibold animate-[popDown_.4s_ease_1]">
                      {successMsg}
                    </p>
                  )}
                </div>
                <div>
                  <Button
                    customClass={
                      "py-5 w-full text-xl rounded-[86px] font-semibold"
                    }
                    text={"Sign up"}
                    clickAct={handleSubmit}
                  />
                </div>
              </form>
            </div>

            <p className="text-center text-secondary text-[15px]">
              Already have an account ?{" "}
              <Link to="/login" className="text-yellow font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[48%] h-screen">
        <picture className="w-full h-full">
          <img
            className="h-screen w-full object-cover"
            src="images/signup.webp"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
