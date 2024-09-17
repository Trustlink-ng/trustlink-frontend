import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="h-[100dvh] w-[100dvw]">
        <Outlet/>
    </div>
  )
}
