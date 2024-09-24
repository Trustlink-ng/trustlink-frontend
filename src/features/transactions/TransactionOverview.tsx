import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button, Chip, ChipProps, Spinner } from "@nextui-org/react";
import { formatBalance } from "../../utils/helpers";
import useGetSingleTransactions from "./services/useGetSingleTransaction";

export default function TransactionOverview({
  isOpen,
  onOpenChange,
  id,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void; // Ensure it expects a boolean
  id: number;
}) {
  const { data, isLoading } = useGetSingleTransactions(id);
  const transaction = data?.data;

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Pending: "warning",
    Completed: "success",
    Refunded: "danger",
  };

  const isRefundable = transaction?.type === "DEBIT";

  return (
    <div>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Transaction Details
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <Spinner size="lg" />
                ) : (
                  <>
                    <div className="flex flex-col gap-2 items-center">
                      <h2 className="font-semibold text-3xl">
                        {formatBalance({
                          country: "Nigeria",
                          balance: transaction?.amount || 0,
                        })}
                      </h2>
                      <p className="text-slate-500 font-medium">
                        {new Date(transaction?.date || "").toLocaleString()}
                      </p>
                      <div className="flex gap-3">
                        <Chip
                          className="capitalize rounded-md text-sm"
                          color="primary"
                          size="sm"
                          variant="flat"
                        >
                          {transaction?.type === "CREDIT"
                            ? "Incoming"
                            : "Outgoing"}
                        </Chip>

                        <Chip
                          className="capitalize rounded-md text-sm"
                          color={statusColorMap[transaction?.status || "Red"]}
                          size="sm"
                          variant="flat"
                        >
                          {transaction?.status}
                        </Chip>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mx-24">
                      <div className="flex font-semibold justify-between">
                        <p>From</p>
                        <p>
                          {transaction?.sender.firstName +
                            " " +
                            transaction?.sender.lastName}
                        </p>
                      </div>
                      <div className="flex font-semibold justify-between">
                        <p>To</p>
                        <p>
                          {transaction?.receiver.firstName +
                            " " +
                            transaction?.receiver.lastName}
                        </p>
                      </div>
                      <div className="flex font-semibold justify-between">
                        <p>Description</p>
                        <p>{transaction?.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter className="items-center flex justify-center">
                <Button
                  color="danger"
                  variant="shadow"
                  onPress={() => onOpenChange(false)} // Update to use the onOpenChange function
                >
                  Close
                </Button>
                {isRefundable && (
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={() => onOpenChange(false)} // Update to use the onOpenChange function
                  >
                    Refund
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
