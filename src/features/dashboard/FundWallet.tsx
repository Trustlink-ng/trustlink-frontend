import { CiWallet } from "react-icons/ci";

export default function FundWallet() {
  return (
    <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
      <CiWallet className="text-xl" />
      <p className="text-sm font-medium">Fund Wallet</p>
    </div>
  );
}
