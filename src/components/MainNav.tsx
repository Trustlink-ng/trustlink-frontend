import { GrTransaction } from "react-icons/gr";
import { CiCreditCard1, CiHome, CiWallet } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

export const MainNav = ({ handleClose }: { handleClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => [
    localStorage.removeItem("access_token"),
    navigate("/login"),
  ];

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };
  return (
    <div className="flex flex-col">
      <nav className="w-full text-black text-sm py-6 lg:text-lg flex flex-col items-start justify-center gap-3">
        <NavLink onClick={handleClose} to={"/"}>
          <CiHome color="#264653" className="text-2xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink onClick={handleClose} to={"transactions"}>
          <GrTransaction color="#264653" className="text-2xl" />
          <span>Transactions</span>
        </NavLink>
        <NavLink onClick={handleClose} to={"wallet"}>
          <CiWallet color="#264653" className="text-2xl" />
          <span>Wallet</span>
        </NavLink>
        <NavLink onClick={handleClose} to={"cards"}>
          <CiCreditCard1 color="#264653" className="text-2xl" />
          <span>Cards</span>
        </NavLink>
        <span
          className="flex gap-2 w-full px-3 justify-start items-center text-left py-2 cursor-pointer"
          onClick={handleOpen}
        >
          <IoSettingsOutline color="#264653" className="text-2xl" />
          <span className="flex-1 lg:ms-3 text-left rtl:text-right whitespace-nowrap">
            Settings
          </span>
          {isOpen ? (
            <IoIosArrowUp color="#264653" className="text-2xl" />
          ) : (
            <IoIosArrowDown color="#264653" className="text-2xl" />
          )}
        </span>
        {isOpen && (
          <>
            <NavLink
              onClick={handleClose}
              to={"settings/account"}
              className={"child"}
            >
              <span>Account Settings</span>
            </NavLink>
            <NavLink
              onClick={handleClose}
              to={"settings/wallet"}
              className={"child"}
            >
              <span>Wallet Settings</span>
            </NavLink>
          </>
        )}
      </nav>
      <div
        className="flex gap-2 px-3 items-center hover:opacity-50 cursor-pointer"
        onClick={handleLogout}
      >
        <TbLogout2 color="red" className="text-3xl" />
        <span className="text-[red] lg:text-xl">Logout</span>
      </div>
    </div>
  );
};
