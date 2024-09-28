import { CiWallet } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function FundWallet() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/wallet/fund")}
      className="flex cursor-pointer flex-col items-center rounded-md w-full text-center gap-2 hover:bg-blue-100 p-2 justify-center"
    >
      <CiWallet className="text-xl" />
      <p className="text-sm font-medium">Fund Wallet</p>
    </div>
  );
}
