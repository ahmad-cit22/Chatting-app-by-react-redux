import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchBar";
import JoinGroupField from "../../components/joinGroupField";
import FriendReqField from "../../components/friendReqField";
import FriendsField from "../../components/friendsField";
import UsersField from "../../components/usersField";
import BlockField from "../../components/blockField";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MyGroupsField from "../../components/myGroupsField";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userLoginInfo.userInfo);

  const [emailVerify, setEmailVerify] = useState(false);

  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    } else if (userData.emailVerified) {
      setEmailVerify(true);
    }
  }, []);

  return (
    userData !== null &&
    (!emailVerify ? (
      <div className="bg-primary/20 border-[1px] lg:border-[3px] border-[#5F35F580] rounded-md mt-14 text-primaryTwo flex-col justify-center items-center p-5 lg:p-10 lg:pt-8 w-4/5 lg:w-3/5 m-auto text-xl lg:text-[28px] font-semibold text-center animate-[popUp_.4s_ease_1]">
        <p className="lg:leading-[34px]">
          Please verify your email address first in order to get access to your
          account.
        </p>
        <p className="mt-2 lg:mt-3 text-lg lg:text-2xl">
          Check your email for the verification link.
        </p>
      </div>
    ) : (
      <div className="py-5 px-3 md:px-8 lg:px-5 flex gap-x-6 h-screen font-pop">
        <Sidebar activePage={"home"} />
        <div className="w-full lg:ml-[135px] xl:ml-0 lg:w-[86%] xl:w-[88%] h-full flex flex-col gap-y-9 lg:gap-y-8 xl:gap-y-0 lg:gap-x-4 lg:flex-row lg:justify-between lg:flex-wrap xl:flex-nowrap">
          <div className="w-full lg:w-[48%] xl:w-[34%] flex flex-col gap-y-9 lg:gap-y-8 xl:gap-y-0  justify-between">
            <SearchBar />
            <JoinGroupField />
            <FriendReqField />
          </div>
          <div className="w-full lg:w-[48%] xl:w-[28%] flex flex-col gap-y-9 lg:gap-y-8 xl:gap-y-0  justify-between">
            <FriendsField btnOneTxt={"Block"} />
            <MyGroupsField />
          </div>
          <div className="w-full xl:w-[34%] flex flex-col lg:flex-row xl:flex-col gap-y-9 lg:gap-y-0 lg:gap-x-9 xl:gap-x-0 justify-between">
            <UsersField />
            <BlockField />
          </div>
        </div>
      </div>
    ))
  );
};

export default Home;
