import { Card, CardBody } from "@nextui-org/card";
// import { TbNewSection } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";




export default function Actions() {
  return (
    <div className="h-full">
      <Card className="p-2 h-full rounded-lg space-y-1">
        <h2 className="capitalize font-semibold">Quick Actions</h2>
        <CardBody className="flex flex-row justify-evenly py-4 bg-slate-100">
          {/* <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
            <TbNewSection className="text-xl" />
            <p className="text-sm font-medium">Create Link</p>
          </div> */}
          <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
            <CiWallet className="text-xl" />
            <p className="text-sm font-medium">Fund Wallet</p>
          </div>
          <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
            <IoPaperPlaneOutline className="text-xl" />
            <p className="text-sm font-medium">Transfer</p>
          </div>
          <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
            <FiRefreshCw className="text-xl" />
            <p className="text-sm font-medium">Withdraw</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
