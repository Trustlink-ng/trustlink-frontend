import { Outlet, useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";

import SideBar from "./SideBar";
import Logo from "./Logo";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { getInitials } from "../utils/helpers";
import { GiHamburgerMenu } from "react-icons/gi";
import { MainNav } from "./MainNav";

export default function AppLayout() {
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const navRef = useRef<HTMLDivElement>(null); // Ref to track the nav

  const handleToggle = () => {
    setToggle((toggle) => !toggle);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setToggle(false); // Call handleClose when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Fetch email from localStorage when component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setName(user.firstName + user.lastName);
    }
  }, []);
  return (
    <div className="w-full h-full grid  grid-rows-[auto_1fr] divide-y-1 divide-[#D1D0D0] bg-main">
      <div className="w-full max-h-24 sticky top-0 z-30 flex justify-between lg:p-2 bg-main items-center px-5 lg:px-8">
        <Logo />
        <div className="flex items-center gap-6 justify-center">
          <GiHamburgerMenu
            className="text-2xl lg:hidden cursor-pointer"
            onClick={handleToggle}
          />
          <div
            ref={navRef}
            className={`lg:hidden p-12 px-8 h-screen transition-all duration-1000 ${
              toggle ? "w-[300px] md:w-1/2" : "w-0 hidden"
            } bg-main z-10 absolute left-0 top-0 row-span-full flex items-start flex-col]`}
          >
            <div className="absolute top-8 z-11">
              <LiaTimesSolid
                className="text-2xl cursor-pointer"
                onClick={handleToggle}
              />
            </div>
            <MainNav handleClose={handleToggle} />
          </div>
          <Avatar
            onClick={() => navigate("/settings")}
            className="uppercase hidden bg-blue-200 lg:inline-block cursor-pointer text-lg"
            showFallback
            
            name={getInitials(name) || ""}
            size="lg"
          />
        </div>
      </div>
      <div className="w-full h-full divide-x-1 pb-12 overflow-hidden divide-[#D1D0D0] grid grid-cols-1 lg:grid-cols-[20%_80%]">
        <SideBar />
        <div className="w-full h-full overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
