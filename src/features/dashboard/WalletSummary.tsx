import Actions from "./Actions";
import Chart from "./Chart";
import WalletBalance from "./WalletBalance";

export default function WalletSummary() {
  return (
    <div className="w-full flex-none grow-0 grid lg:grid-cols-2 gap-6">
      <div className="w-full h-full flex flex-col gap-2">
        <WalletBalance />
        <Actions />
      </div>
      <div className="hidden lg:block">
        <Chart />
      </div>
    </div>
  );
}
