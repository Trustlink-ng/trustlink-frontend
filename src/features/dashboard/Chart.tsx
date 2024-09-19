import { Card, CardBody } from "@nextui-org/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Chart() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="w-full h-full">
      <Card className=" w-full h-full">
        <CardBody className="flex w-full h-full justify-center items-cente">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                nameKey="name"
                dataKey="value"
                cx="40%"
                cy="50%"
                outerRadius={105}
                startAngle={180}
                endAngle={-180}
              >
                {data.map((entry, index) => (
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
