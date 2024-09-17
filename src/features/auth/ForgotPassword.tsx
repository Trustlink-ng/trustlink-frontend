import { Button, Input } from "@nextui-org/react";
import { IoMail } from "react-icons/io5";


export default function ForgotPassword() {

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] lg:max-w-full flex lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl  ">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div className="w-full">
          <h1 className="lg:text-4xl text-left text-2xl font-medium">
            Enter your mail
          </h1>
        </div>
        <form action="" className="">
          <div className="w-full">
            <p className="text-slate-500 text-left text-base">
              We will send a code to your mail
            </p>
          </div>
          <div className="py-6 space-y-6 w-full max-w-lg">
            <Input
              placeholder="Your Username..."
              type="text"
              name="username"
              startContent={
                <IoMail
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
              className="w-full"
              size="lg"
            />
            <Button
              className="bg-primary w-full max-w-xs font-semibold outline-none data-[focus-visible=true]:outline-0 text-white"
              size="md"
              name="submit"
            >
              Send OTP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
