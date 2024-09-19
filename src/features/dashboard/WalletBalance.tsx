import { Card, CardHeader } from "@nextui-org/card";

export default function WalletBalance() {
  return (
    <div className="w-full h-full">
      <Card className="p-2 py-1 h-full rounded-lg">
        <CardHeader className="flex flex-col items-start justify-start gap-1">
          <h3 className="capitalize text-lg font-bold text-primary">Your Wallet Balance</h3>
          <h4 className="text-xl font-semibold">
            NGN <span className="text-2xl">0.00</span>
          </h4>
          <h3 className="font-medium text-primary flex items-center gap-2 capitalize text-base">
            Cleared Amount:{" "}
            <p className="space-x-1 flex items-center">
              <span className="text-base">NGN</span>
              <span className="text-xl">0.00</span>
            </p>
          </h3>
        </CardHeader>
      </Card>
    </div>
  );
}
