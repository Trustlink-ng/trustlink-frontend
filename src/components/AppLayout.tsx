import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Logo from "./Logo";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Avatar, Badge } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getInitials } from "../utils/helpers";

export default function AppLayout() {
  const [name, setName] = useState("");
    const navigate = useNavigate();

  // Fetch email from localStorage when component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setName(user.firstName + user.lastName);
    }
  }, []);
  return (
    <div className="w-full h-full grid lg:grid-rows-[auto_1fr] divide-y-1 divide-[#D1D0D0] bg-main">
      <div className="w-full h-full flex justify-between items-center px-8">
        <Logo />
        <div className="flex items-center gap-6 justify-center">
          <Badge color="danger" content={5} isInvisible={false} shape="circle">
            <IoMdNotificationsOutline className="fill-current text-3xl" />
          </Badge>
          <Avatar onClick={() => navigate('/settings')} className="uppercase cursor-pointer" showFallback name={getInitials(name) || ""} />
        </div>
      </div>
      <div className="w-full h-full divide-x-1 divide-[#D1D0D0] grid grid-cols-1 lg:grid-cols-[20%_80%]">
        <SideBar />
        <div className="w-full h-full p-3 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
