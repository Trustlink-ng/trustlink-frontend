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
import { useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { columns, formatBalance } from "../../utils/helpers"; // Import columns
import TransactionOverview from "./TransactionOverview";
import { Transaction, TransactionTable } from "../../utils/types"; // Import Transaction type

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pending: "warning",
  Completed: "success",
  Refunded: "danger",
};

export default function TransactionSummary({transactions }: {transactions: Transaction[] | []}) {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // For navigation when closing modal
  const { isOpen } = useDisclosure({ isOpen: !!id }); // Open if id is present

  const selectedTransaction = transactions?.find((t) => t.id === Number(id));

  const handleRowClick = (transactionId: number) => {
    navigate(`/transactions/${transactionId}`); // Navigate to the URL with the transaction ID
  };

  const handleCloseModal = () => {
    navigate("/transactions"); // Close modal by navigating back to the main transactions route
  };

  const renderCell = useCallback(
    (transaction: TransactionTable, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof TransactionTable];

      switch (columnKey) {
        case "sender":
          return `${transaction.sender.firstName} ${transaction.sender.lastName}`;
        case "receiver":
          return `${transaction.receiver.firstName} ${transaction.receiver.lastName}`;
        case "amount":
          return (
            <div
              className={`${
                transaction.type === "CREDIT"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatBalance({
                country: "Nigeria",
                balance: cellValue,
              })}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[transaction.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "date":
          return new Date(cellValue).toLocaleString(); // Convert date to readable format
        default:
          return cellValue;
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
        <TableBody items={transactions} emptyContent={"No transactions to display."}>
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
