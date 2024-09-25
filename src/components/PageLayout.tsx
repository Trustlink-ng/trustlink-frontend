import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="h-screen w-full min-w-[100dvw] overflow-hidden">
        <Outlet/>
    </div>
  )
}
