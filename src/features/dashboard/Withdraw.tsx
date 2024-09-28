import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate("/wallet/withdraw")}className="flex cursor-pointer flex-col text-center w-full gap-2 items-center rounded-md hover:bg-blue-100 p-2 justify-center">
      <FiRefreshCw className="text-xl" />
      <p className="text-sm font-medium">Withdraw</p>
    </div>
  );
}
