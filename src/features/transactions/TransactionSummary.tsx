import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { columns, formatBalance, formatDate } from "../../utils/helpers"; // Import columns
import { Transaction, TransactionTable, User } from "../../utils/types"; // Import Transaction type

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pending: "warning",
  Completed: "success",
  Refunded: "danger",
  Cancelled: "danger",
};

export default function TransactionSummary({
  transactions,
}: {
  transactions: Transaction[] | [];
}) {
  const navigate = useNavigate();

  const handleRowClick = (transactionId: number) => {
    navigate(`/transactions/${transactionId}`);
  };

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionTable];

      switch (columnKey) {
        case "sender":
          return typeof cellValue === "object" && cellValue !== null
            ? `${(cellValue as User).firstName} ${(cellValue as User).lastName}`
            : "Kora Payment Link";
        case "amount":
          return (
            <div
              className={`${
                transaction.type === "CREDIT"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {typeof cellValue === "number"
                ? formatBalance({ country: "Nigeria", balance: cellValue })
                : "--"}
            </div>
          );
        case "description":
          return (
            <p className="text-ellipsis overflow-hidden capitalize truncate w-32">
              {typeof cellValue === "string" ? cellValue : "--"}
            </p>
          );
        case "status":
          return (
            <Chip
              className="capitalize lg:text-lg"
              color={statusColorMap[transaction.status] || "default"}
              size="sm"
              variant="flat"
            >
              {typeof cellValue === "string" ? cellValue : "Pending"}
            </Chip>
          );
        case "date":
          return typeof cellValue === "string" || typeof cellValue === "number"
            ? formatDate(cellValue)
            : "--";
        default:
          return typeof cellValue === "string" || typeof cellValue === "number"
            ? cellValue
            : "--";
      }
    },
    []
  );

  return (
    <Table
      aria-label="Table for Transactions"
      isHeaderSticky
      classNames={{
        wrapper: "max-h-[450px]",
        base: "h-full hidden lg:flex",
        table: "overflow-y-scroll h-full",
        th: "bg-white shadow-0",
        tr: "cursor-pointer hover:opacity-90 hover:bg-slate-300 rounded-md lg:text-lg",
        thead: "shadow-0",
        tbody: "h-full overflow-y-scroll text-xl",
        td: "lg:text-lg",
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
      <TableBody
        items={transactions}
        emptyContent={"No transactions to display."}
      >
        {(item) => (
          <TableRow key={item.id} onClick={() => handleRowClick(item.id)}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
