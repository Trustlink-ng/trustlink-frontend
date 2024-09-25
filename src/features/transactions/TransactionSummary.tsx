import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { columns, formatBalance } from "../../utils/helpers"; // Import columns
import TransactionOverview from "./TransactionOverview";
import { Transaction, TransactionTable, User } from "../../utils/types"; // Import Transaction type

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pending: "warning",
  Completed: "success",
  Refunded: "danger",
};

export default function TransactionSummary({
  transactions,
}: {
  transactions: Transaction[] | [];
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen } = useDisclosure({ isOpen: !!id });

  const selectedTransaction = transactions?.find((t) => t.id === Number(id));

  const handleRowClick = (transactionId: number) => {
    navigate(`/transactions/${transactionId}`);
  };

  const handleCloseModal = () => {
    navigate("/transactions");
  };

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionTable];

      switch (columnKey) {
        case "sender":
          return typeof cellValue === "object" && cellValue !== null
            ? `${(cellValue as User).firstName} ${(cellValue as User).lastName}`
            : "Kora Payment Link";
        case "receiver":
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
                : "--"}{" "}
              {/* Ensure that balance is a number */}
            </div>
          );
        case "description":
          return (
            <p className="text-ellipsis overflow-hidden truncate">
              {" "}
              {typeof cellValue === "string" ? cellValue : "--"}
            </p>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[transaction.status] || "default"} // Ensure fallback color
              size="sm"
              variant="flat"
            >
              {typeof cellValue === "string" ? cellValue : "Pending"}{" "}
              {/* Only render if cellValue is a string */}
            </Chip>
          );
        case "date":
          return typeof cellValue === "string" || typeof cellValue === "number"
            ? new Date(cellValue).toLocaleString() // Convert valid date to readable format
            : "--"; // Fallback if the date is not valid
        default:
          return typeof cellValue === "string" || typeof cellValue === "number"
            ? cellValue
            : "--"; // Ensure only renderable values are returned
      }
    },
    []
  );

  return (
    <>
      <Table
        aria-label="Table for Transactions"
        isHeaderSticky
        classNames={{
          base: "h-full max-h-[40rem] shadow-none",
          th: "bg-white shadow-0",
          tr: "cursor-pointer hover:opacity-90",
          thead: "shadow-0",
          tbody: "h-full overflow-y-scroll",
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

      {selectedTransaction && (
        <TransactionOverview
          isOpen={isOpen}
          onOpenChange={(open) => !open && handleCloseModal()} // Close modal and navigate back
          id={selectedTransaction.id} // Pass selected transaction ID
        />
      )}
    </>
  );
}
