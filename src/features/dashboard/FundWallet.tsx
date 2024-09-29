import { CiWallet } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function FundWallet() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/wallet/fund")}
      className="flex cursor-pointer flex-col items-center rounded-md w-full text-center gap-2 hover:bg-blue-100 p-2 justify-center"
    >
      <div>
        <CiWallet className="text-xl lg:text-3xl" />
      </div>
      <p className="text-sm lg:text-base font-medium">Fund Wallet</p>
    </div>
  );
}
