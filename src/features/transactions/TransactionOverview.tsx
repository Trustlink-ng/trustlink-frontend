import { useState } from "react";
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
import OtpInput from "../auth/OtpInput";
import useVerifyTransaction from "./services/useVerifyTransaction";
import { toast } from "react-toastify";

export default function TransactionOverview({
  isOpen,
  onOpenChange,
  id, // Get the transaction ID
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: number;
}) {
  const { data, isLoading } = useGetSingleTransactions(id);
  const [otp, setOtp] = useState(""); // Add OTP state
  const transaction = data?.data;

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Pending: "warning",
    Completed: "success",
    Refunded: "danger",
  };

  const isIncoming = transaction?.type === "CREDIT" && transaction?.status !== "Completed";

  // Pass the transaction ID to useVerifyTransaction
  const { mutate, isPending } = useVerifyTransaction(id);

  const handleVerify = () => {
    if (otp.length === 4) {
      // Call mutate with OTP
      mutate(
        { code: otp }, // OTP passed in as the payload
        {
          onSuccess: () => {
            onOpenChange(false); // Close the modal on success
          },
        }
      );
    } else {
      toast.error("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ closeButton: "top-3 right-3" }}
      >
        <ModalContent className="p-3">
          {() => (
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
                      <div className="flex font-semibold justify-between gap-5">
                        <p>From</p>
                        <p>
                          {transaction?.sender
                            ? transaction?.sender.firstName +
                              " " +
                              transaction?.sender.lastName
                            : "Kora Payment Link"}
                        </p>
                      </div>
                      <div className="flex font-semibold justify-between gap-5">
                        <p>To</p>
                        <p>
                          {transaction?.receiver
                            ? transaction?.receiver.firstName +
                              " " +
                              transaction?.receiver.lastName
                            : "Kora Payment Link"}
                        </p>
                      </div>
                      <div className="flex font-semibold justify-between gap-8">
                        <p>Description</p>
                        <p className="text-ellipsis overflow-hidden truncate">
                          {" "}
                          {typeof transaction?.description === "string"
                            ? transaction?.description
                            : "--"}
                        </p>
                      </div>
                    </div>
                    {isIncoming && (
                      <div className="flex flex-col gap-3 items-center justify-center">
                        <h2 className="font-semibold text-primary">
                          Enter the code from the customer
                        </h2>
                        <OtpInput
                          length={4}
                          onChange={setOtp} // Update OTP state when changed
                        />
                      </div>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter className="items-center flex justify-end">
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={() => onOpenChange(false)} // Close modal manually
                >
                  Close
                </Button>
                {isIncoming && (
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={handleVerify} // Call handleVerify on click
                    isLoading={isPending} // Show loading spinner if request is pending
                  >
                    Verify
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
