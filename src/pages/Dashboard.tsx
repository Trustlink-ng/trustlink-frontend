import TransactionSummary from "../features/dashboard/TransactionSummary"
import WalletSummary from "../features/dashboard/WalletSummary"

export default function Dashboard() {
  return (
    <div className="w-full h-full grid grid-rows-[35%_65%] gap-3">
      <WalletSummary/>
      <TransactionSummary/>
    </div>
  )
}
