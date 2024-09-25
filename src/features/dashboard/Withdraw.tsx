import { FiRefreshCw } from "react-icons/fi";

export default function Withdraw() {
  return (
    <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
      <FiRefreshCw className="text-xl" />
      <p className="text-sm font-medium">Withdraw</p>
    </div>
  );
}
