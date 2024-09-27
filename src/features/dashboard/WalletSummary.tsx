import Actions from "./Actions";
import Chart from "./Chart";
import WalletBalance from "./WalletBalance";

export default function WalletSummary() {
  return (
    <div className="w-full h-full grid lg:grid-cols-2 gap-6">
        <div className="w-full h-full grid grid-rows-2 gap-2">
            <WalletBalance/>
            <Actions/>
        </div>
        <div className="hidden lg:block"><Chart/></div>
    </div>
  )
}
