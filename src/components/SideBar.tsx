import { MainNav } from "./MainNav";

export default function SideBar() {
  return (
      <div className="w-full hidden h-screen lg:flex px-6 flex-col ">
        <MainNav />
      </div>
  );
};
