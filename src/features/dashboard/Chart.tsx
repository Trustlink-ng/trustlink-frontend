import { Card, CardBody } from "@nextui-org/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useGetAllTransactions from "../transactions/services/useGetAllTransactions";

export default function Chart() {
  const { data } = useGetAllTransactions();
  const transactions = data?.data;
  const groupedByStatus = transactions?.reduce((acc, transaction) => {
    const { status, amount } = transaction;

    if (!acc[status]) {
      acc[status] = 0; // Initialize if not present
    }

    acc[status] += amount; // Sum up the amounts for each status
    return acc;
  }, {} as Record<string, number>);

  const formattedData = Object.entries(groupedByStatus ?? {}).map(([status, value]) => ({
    name: status,
    value: value,
  }));

  const COLORS = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F"];


  return (
    <div className="w-full h-full">
      <Card className=" w-full h-full">
        <CardBody className="flex w-full h-full justify-center items-cente">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={formattedData}
                nameKey="name"
                dataKey="value"
                cx="40%"
                cy="50%"
                outerRadius={105}
                startAngle={180}
                endAngle={-180}
              >
                {formattedData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                    stroke={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                // verticalAlign='bottom'
                // align='center'
                verticalAlign="middle"
                align="right"
                width="35%"
                layout="vertical"
                iconSize={16}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
