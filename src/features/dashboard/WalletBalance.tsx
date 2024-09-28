import { Card, CardHeader } from "@nextui-org/card";
import useGetWallet from "../wallet/services/useGetWallet";
import { Button, Spinner } from "@nextui-org/react";
import { formatBalance } from "../../utils/helpers";

export default function WalletBalance() {
  const { data, isLoading } = useGetWallet();
  const wallet = data?.wallet;

  return (
    <Card className="p-2 py-5 w-full rounded-lg">
      {isLoading ? (
        <Spinner color="primary" size="lg" />
      ) : !wallet ? (
        <CardHeader className="flex flex-col items-center justify-center gap-1">
          <Button
            className="bg-primary w-full max-w-xs outline-none data-[focus-visible=true]:outline-0 text-white"
            size="md"
            radius="full"
          >
            Create Wallet
          </Button>
        </CardHeader>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <CardHeader className="flex py-3 flex-col items-start justify-between gap-1">
          <h3 className="capitalize text-xl font-bold text-primary">
            Your Wallet Balance
          </h3>
          <h4 className="text-2xl font-semibold">
            <span className="text-4xl">
              {formatBalance({
                country: "nigeria",
                balance: wallet?.balance || 0,
              })}
            </span>
          </h4>
        </CardHeader>
      )}
    </Card>
  );
}
