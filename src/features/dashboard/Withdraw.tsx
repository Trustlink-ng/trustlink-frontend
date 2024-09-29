import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate("/wallet/withdraw")}className="flex cursor-pointer flex-col text-center w-full gap-2 items-center rounded-md hover:bg-blue-100 p-2 justify-center">
      <div>
        <FiRefreshCw className="text-xl lg:text-3xl" />
      </div>
      <p className="text-sm lg:text-base font-medium">Withdraw</p>
    </div>
  );
}
