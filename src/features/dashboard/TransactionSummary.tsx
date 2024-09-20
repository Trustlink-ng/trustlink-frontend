import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  ChipProps,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { columns, users } from "../../utils/helpers";
import TransactionOverview from "./TransactionOverview";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function TransactionSummary() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-xl flex flex-col gap-1">
      <div className="w-full flex justify-between items-center py-2 px-3">
        <h1 className="font-semibold text-xl">Recent History</h1>
        <Button
          onClick={() => navigate("/transactions")}
          className="py-1 px-2 rounded-md bg-primary text-white text-base font-medium"
        >
          See more
        </Button>
      </div>
      <Table
        isHeaderSticky
        aria-label="Table for Transactions"
        classNames={{
          base: "max-h-[40rem] oflow-y-scroll shadow-none",
          th: "bg-white shadow-0",
          tr: "cursor-pointer hover:opacity-90",
          thead: "shadow-0"
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              align="start"
              className="text-md text-primary bg-white"
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow onClick={onOpen} key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TransactionOverview isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
