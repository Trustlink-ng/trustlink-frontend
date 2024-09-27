import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="h-screen w-[100vw] overflow-hidden">
        <Outlet/>
    </div>
  )
}
