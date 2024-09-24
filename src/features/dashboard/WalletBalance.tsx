import { Card, CardHeader } from "@nextui-org/card";
import useGetWallet from "../wallet/services/useGetWallet";
import { Button, Skeleton } from "@nextui-org/react";
import { formatBalance } from "../../utils/helpers";

export default function WalletBalance() {
  const { data, isLoading } = useGetWallet();
  const wallet = data?.wallet ;

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Card className="p-2 py-1 h-full rounded-lg">
          <CardHeader className="flex flex-col items-start justify-between gap-1">
            <Skeleton>
              <h3 className="capitalize text-xl font-bold text-primary">
                Your Wallet Balance
              </h3>
            </Skeleton>
            <Skeleton>
              <h4 className="text-5xl font-semibold"></h4>
            </Skeleton>
          </CardHeader>
        </Card>
      ) : (
        <Card className="p-2 py-1 h-full rounded-lg">
          {!wallet ? (
            <CardHeader className="flex flex-col items-center justify-center h-full gap-1">
              <Button
                className="bg-primary w-full max-w-xs outline-none data-[focus-visible=true]:outline-0 text-white"
                size="md"
                radius="full"
              >
                Create Wallet
              </Button>
            </CardHeader>
          ) : (
            <CardHeader className="flex flex-col items-start justify-between gap-1">
              <h3 className="capitalize text-xl font-bold text-primary">
                Your Wallet Balance
              </h3>
              <h4 className="text-2xl font-semibold">
                <span className="text-5xl">
                  {formatBalance({
                    country: "nigeria",
                    balance: wallet?.balance || 0,
                  })}
                </span>
              </h4>
            </CardHeader>
          )}
        </Card>
      )}
    </div>
  );
}
