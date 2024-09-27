import { GrTransaction } from "react-icons/gr";
import { CiCreditCard1, CiHome, CiWallet } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

export const MainNav = ({ handleClose }: { handleClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };
  return (
    <nav className="text-black text-sm py-6 lg:text-lg flex flex-col items-start justify-center gap-3">
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
        className="flex gap-2 w-full px-3 justify-start border-l-5 items-center text-left py-2 cursor-pointer"
        onClick={handleOpen}
      >
        <IoSettingsOutline color="#264653" className="text-2xl" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
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
      <div>
        <TbLogout2 color="red" size={22} />
        <span className="text-[red]">Logout</span>
      </div>
    </nav>
  );
};
