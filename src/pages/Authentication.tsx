import { Outlet } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


export default function Authentication() {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full h-full mx-auto">
        <Outlet />
      </div>
      <div className="hidden lg:block w-full h-full bg-primary bg-auth bg-no-repeat bg-center">
        <div className="relative flex h-full w-full flex-col items-start justify-end overflow-hidden">
          <div className="p-12 space-y-6">
            <h1 className="text-white font-semibold text-4xl">Payments made Easier!</h1>
            <p className="text-white text-lg flex gap-2 items-start justify-center"> 
              <span>
                <FaArrowRight color="white" size={20}/>
              </span>
              Manage your payments securely, anywhere, anytime. Transfer money 
              and monitor your transactions with ease
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
