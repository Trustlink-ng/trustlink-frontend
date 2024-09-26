import { MainNav } from "./MainNav";

export default function SideBar() {
  return (
      <div className="w-full hidden lg:flex px-6 flex-col py-8">
        <MainNav />
      </div>
  );
};
