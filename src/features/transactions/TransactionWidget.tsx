import { Card, CardHeader } from "@nextui-org/react";
import { ReactNode } from "react";
import { formatBalance } from "../../utils/helpers";

export default function TransactionWidget({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <Card className="w-full max-w-96 lg:w-96">
      <CardHeader className="h-32 flex flex-col lg:flex-row items-center justify-center gap-2 my-2 lg:gap-4">
        <div className="p-3 bg-blue-300 rounded-full">{icon}</div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-slate-500 text-md lg:text-lg font-semibold">{title}</p>
          <p className="text-2xl lg:text-3xl font-semibold">
            {typeof value === "number"
              ? formatBalance({
                  country: "Nigeria",
                  balance: value,
                })
              : value}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
