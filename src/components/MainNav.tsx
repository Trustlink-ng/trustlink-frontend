import { GrTransaction } from "react-icons/gr";
import { CiCreditCard1, CiHome } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

export const MainNav = () => {
  return (
    <nav className="text-black text-sm lg:text-lg flex flex-col items-start justify-center gap-3">
      <NavLink to={"/"} >
        <CiHome color="#264653" className="text-2xl" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to={"transactions"}>
        <GrTransaction color="#264653" className="text-2xl" />
        <span>Transactions</span>
      </NavLink>
      <NavLink to={"cards"}>
        <CiCreditCard1 color="#264653" className="text-2xl" />
        <span>Cards</span>
      </NavLink>
      <NavLink to={"settings"}>
        <IoSettingsOutline color="#264653" className="text-2xl" />
        <span>Settings</span>
      </NavLink>
      <div>
        <TbLogout2 color="red" size={22} />
        <span className="text-[red]">Logout</span>
      </div>
    </nav>
  );
};
