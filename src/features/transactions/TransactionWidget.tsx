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
    <Card className="w-96">
      <CardHeader className="flex items-center m-6 gap-4">
        <div className="p-3 bg-blue-300 rounded-full">{icon}</div>
        <div className="flex flex-col gap-1">
          <p className="text-slate-500 text-lg">{title}</p>
          <p className="text-3xl">
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
