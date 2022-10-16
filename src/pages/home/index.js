import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchBar";
import JoinGroupField from "../../components/joinGroupField";
import FriendReqField from "../../components/friendReqField";
import FriendsField from "../../components/friendsField";
import GroupsField from "../../components/groupsField";
import UsersField from "../../components/usersField";
import BlockField from "../../components/blockField";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  console.log(user);
  let [emailVerify, setEmailVerify] = useState(false);

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    } else if (auth.currentUser.emailVerified) {
      setEmailVerify(true);
    }
  }, []);

  return emailVerify ? (
    <div className="py-8 pl-7 pr-6 flex gap-x-11 h-screen font-pop">
      <Sidebar activePage={"home"} />
      <div className="w-[85%] h-full flex justify-between">
        <div className="w-[35%] flex flex-col justify-between">
          <SearchBar />
          <JoinGroupField />
          <FriendReqField />
        </div>
        <div className="w-[29%] flex flex-col justify-between">
          <FriendsField />
          <GroupsField />
        </div>
        <div className="w-[29%] flex flex-col justify-between">
          <UsersField />
          <BlockField />
        </div>
      </div>
    </div>
  ) : (
    user !== null && (
      <div className="bg-primary/20 border-[3px] border-[#5F35F580] rounded-md mt-14 text-primaryTwo flex-col justify-center items-center p-10 pt-8 w-3/5 m-auto text-3xl font-semibold text-center animate-[popUp_.4s_ease_1]">
        <p>
          Please verify your email address first in order to get access to your
          account.
        </p>
        <p className="mt-3 text-2xl">
          Check your email for the verification link.
        </p>
      </div>
    )
  );
};

export default Home;
