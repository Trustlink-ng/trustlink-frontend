import { Button, Input } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl  ">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div>
          <h1 className="lg:text-4xl text-xl font-medium">
            Good to see you again today!👋
          </h1>
        </div>
        <form action="">
          <p className="text-slate-500">Sign in to your account to continue</p>
          <div className="py-6 space-y-4 max-w-sm">
            <Input
              placeholder="Your Username..."
              type="text"
              name="username"
              startContent={
                <IoPersonOutline
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              classNames={{
                input: [" outline-none focus:outline-none"],
                innerWrapper: "bg-white hover:bg-white focus:bg-white",
                inputWrapper: [
                  "border-2 border-primary bg-white data-[hover=true]:bg-white group-data-[focus=true]/input:bg-white",
                ],
              }}
              className="max-w-xs"
              size="md"
            />
            <Input
              placeholder="Your Password..."
              name="password"
              type={isVisible ? "text" : "password"}
              startContent={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <FaRegEyeSlash
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FaRegEye
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              classNames={{
                input: [" outline-none focus:outline-none"],
                innerWrapper: "bg-white hover:bg-white focus:bg-white",
                inputWrapper: [
                  "border-2 border-primary bg-white data-[hover=true]:bg-white group-data-[focus=true]/input:bg-white",
                ],
              }}
              className="max-w-xs"
              size="md"
            />
            <div className="flex justify-end">
              <p
                className="font-medium text-primary cursor-pointer text-sm hover:opacity-80"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>
            </div>
            <Button
              className="bg-primary w-full max-w-xs outline-none font-semibold data-[focus-visible=true]:outline-0 text-white"
              size="md"
              name="submit"
            >
              Sign in
            </Button>
            <div className="flex justify-start">
              <p className="font-medium text-sm">
                Don't have an account?{" "}
                <span
                  className="font-medium text-primary cursor-pointer hover:opacity-80"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
