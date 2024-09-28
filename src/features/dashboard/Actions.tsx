import { Card, CardBody } from "@nextui-org/card";
import CreatePaymentLink from "./CreatePaymentLink";
import FundWallet from "./FundWallet";
import Transfer from "./Transfer";
import Withdraw from "./Withdraw";

export default function Actions() {
  return (
    <div className="">
      <Card className="p-2 h-full rounded-lg space-y-1">
        <h2 className="capitalize font-semibold">Quick Actions</h2>
        <CardBody className="flex flex-row justify-evenly h-24 py-4 bg-slate-100">
          <CreatePaymentLink />
          <FundWallet />
          <Transfer />
          <Withdraw />
        </CardBody>
      </Card>
    </div>
  );
}
