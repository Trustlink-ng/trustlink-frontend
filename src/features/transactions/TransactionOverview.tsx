import { useEffect, useState } from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  ChipProps,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { formatBalance } from "../../utils/helpers";
import useGetSingleTransactions from "./services/useGetSingleTransaction";
import OtpInput from "../auth/OtpInput";
import useVerifyTransaction from "./services/useVerifyTransaction";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useRequestRefund from "./services/useRequestRefund";
import useConfirmRefund from "./services/useConfirmRefund";
import useGetDisputes from "./services/useGetDisputes";

export default function TransactionOverview() {
  const { id } = useParams<{ id: string }>();
  const transID = id ? +id : 1;
  const { data, isLoading, isSuccess } = useGetSingleTransactions(transID);
  const { mutate: requestRefund, isPending: isRequestingRefund } =
    useRequestRefund(transID);
  const [otp, setOtp] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null); // State for handling file
  const navigate = useNavigate();
  const [isIncoming, setIsIncoming] = useState(false);
  const [isRefundable, setIsRefundable] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isConfirmRefund, setIsConfirmRefund] = useState(false);
  const queryClient = useQueryClient();
  const { data: disputes, isLoading: isFetchingDisputes ,error} = useGetDisputes();
  console.log(error);

  // Filter the disputes to find if there's any matching the transaction ID
  const matchingDispute = disputes?.data.find(
    (dispute) => dispute.transaction.id === transID
  );

  // If a dispute is found, use the transaction from the dispute; otherwise, use the single transaction data
  const transaction = matchingDispute
    ? matchingDispute.transaction
    : data?.data;

  const { mutate: confirmRefund, isPending: isConfirmingRefund } =
    useConfirmRefund(matchingDispute?.id || 0);

  useEffect(() => {
    setIsIncoming(
      transaction?.type === "CREDIT" &&
        transaction?.status !== "Completed" &&
        transaction?.status !== "Cancelled"
    );
    setIsRefundable(
      transaction?.type === "DEBIT" &&
        transaction?.status !== "Completed" &&
        transaction?.status !== "Refunded" &&
        transaction?.status !== "Cancelled"
    );
    setIsConfirmRefund(
      transaction?.type === "DEBIT" &&
        transaction?.status !== "Completed" &&
        transaction?.status === "Cancelled"
    );
  }, [transaction]);

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Pending: "warning",
    Completed: "success",
    Refunded: "danger",
    Cancelled: "danger",
  };

  const { mutate, isPending } = useVerifyTransaction(transID);

  const handleRefundOpen = () => {
    setIsRefundOpen((refund) => !refund);
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      mutate(
        { code: otp },
        {
          onSuccess: () => {
            setIsIncoming(false);
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
          },
        }
      );
    } else {
      toast.error("Please enter a valid 4-digit OTP.");
    }
  };

  // New handler for file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRefund = () => {
    if (!file) {
      toast.error("Please upload a file for the refund.");
      return;
    }

    requestRefund(
      {
        reason: description,
        proof: file, // This is the File object (e.g., from an input field)
      },
      {
        onSuccess: () => {
          setIsRefundable(false);
          queryClient.invalidateQueries({ queryKey: ["wallet"] });
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({
            queryKey: ["transactions", transID],
          });
        },
      }
    );
  };

  const handleConfirmRefund = () => {
    if (otp.length === 4) {
      confirmRefund(
        { code: otp },
        {
          onSuccess: () => {
            setIsConfirmRefund(false);
            queryClient.invalidateQueries({ queryKey: ["wallet"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({
              queryKey: ["transactions", transID],
            });
          },
        }
      );
    } else {
      toast.error("Please enter a valid 4-digit code.");
    }
  };
  return (
    <div className="w-full h-full p-4 overflow-y-scroll">
      <Breadcrumbs size="lg" color="primary" underline="active">
        <BreadcrumbItem
          key="transactions"
          isCurrent={false}
          onClick={() => navigate("/transactions")}
        >
          Transactions
        </BreadcrumbItem>
        <BreadcrumbItem key={id} isCurrent={true}>
          Transaction Details
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-center justify-center p-3 lg:p-6">
        <Card className="p-6 lg:max-w-2xl w-full bg-transparent shadow-none  lg:shadow-lg md:w-[500px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 items-center">
              Transaction Details
            </div>
            <div className="w-full">
              {isLoading || isFetchingDisputes ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-6 items-center">
                    <h2 className="font-semibold text-3xl">
                      {formatBalance({
                        country: "Nigeria",
                        balance: transaction?.amount || 0,
                      })}
                    </h2>
                    <p className="text-slate-500 font-medium">
                      {new Date(transaction?.date || "").toLocaleString()}
                    </p>
                    <div className="flex gap-6">
                      <Chip
                        className="capitalize rounded-md text-base"
                        color="primary"
                        size="sm"
                        variant="flat"
                      >
                        {transaction?.type === "CREDIT"
                          ? "Incoming"
                          : "Outgoing"}
                      </Chip>
                      <Chip
                        className="capitalize rounded-md text-base"
                        color={statusColorMap[transaction?.status || "Red"]}
                        size="sm"
                        variant="flat"
                      >
                        {transaction?.status}
                      </Chip>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 lg:mx-16">
                    <div className="flex font-semibold justify-between gap-6">
                      <p>From</p>
                      <p className="text-primary">
                        {transaction?.sender
                          ? transaction?.sender.firstName +
                            " " +
                            transaction?.sender.lastName
                          : "Kora Payment Link"}
                      </p>
                    </div>
                    <div className="flex font-semibold justify-between gap-6">
                      <p>To</p>
                      <p className="text-primary">
                        {transaction?.receiver
                          ? transaction?.receiver.firstName +
                            " " +
                            transaction?.receiver.lastName
                          : "Kora Payment Link"}
                      </p>
                    </div>
                    <div className="flex font-semibold justify-between gap-6">
                      <p>Description</p>
                      <p className="text-ellipsis overflow-hidden truncate text-primary">
                        {typeof transaction?.description === "string"
                          ? transaction?.description
                          : "--"}
                      </p>
                    </div>
                  </div>
                  {matchingDispute && (
                    <div className="flex flex-col gap-4 lg:mx-16">
                      <div className="flex font-semibold justify-between gap-6">
                        <p>Dispute Reason</p>
                        <p className="text-primary">{matchingDispute.reason}</p>
                      </div>

                      {/* Render the dispute image if present */}
                      {matchingDispute.evidence && (
                        <div className="flex font-semibold justify-between gap-6">
                          <p>Dispute Image</p>
                          <img
                            src={matchingDispute.evidence}
                            alt="Dispute Evidence"
                            className="max-w-xs rounded"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {isIncoming && (
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <h2 className="font-semibold text-xl text-center text-primary">
                        Enter the code from the customer
                      </h2>
                      <OtpInput
                        id={"confirm-incoming"}
                        length={4}
                        onChange={setOtp}
                      />{" "}
                    </div>
                  )}

                  {isConfirmRefund && (
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <h2 className="font-semibold text-xl text-center text-primary">
                        Enter the code from the merchant
                      </h2>
                      <OtpInput
                        id={"confirm-refund"}
                        length={4}
                        onChange={setOtp}
                      />{" "}
                    </div>
                  )}
                  {isRefundable && isRefundOpen && (
                    <div className="flex flex-col gap-3 max-w-md px-3">
                      <h2 className="font-semibold text-xl text-primary">
                        Reason for Refund
                      </h2>
                      <div className="flex flex-col gap-3">
                        <Textarea
                          label="Reason"
                          isRequired
                          name="reason"
                          variant="bordered"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter your reason"
                          size="lg"
                          classNames={{ label: "text-lg" }}
                          labelPlacement="outside"
                          isDisabled={isRequestingRefund}
                        />
                        <Input
                          label="Evidence"
                          isRequired
                          type="file"
                          variant="bordered"
                          classNames={{ label: "text-lg" }}
                          accept="image/*"
                          name="evidence"
                          onChange={handleFileChange}
                          placeholder="Upload an image as proof"
                          size="lg"
                          labelPlacement="outside"
                          className="max-w-xs cursor-pointer"
                          isDisabled={isRequestingRefund}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="items-center flex gap-3 justify-center">
              {isIncoming && (
                <Button
                  color="primary"
                  variant="shadow"
                  size="lg"
                  onPress={handleVerify}
                  isLoading={isPending}
                >
                  {isPending ? "" : "Verify"}
                </Button>
              )}
              {isConfirmRefund && (
                <Button
                  color="primary"
                  variant="shadow"
                  size="lg"
                  onPress={handleConfirmRefund}
                  isLoading={isConfirmingRefund}
                >
                  {isConfirmingRefund ? "" : "Confirm Refund"}
                </Button>
              )}
              {isRefundOpen && isRefundable && (
                <>
                  <Button
                    color="primary"
                    size="lg"
                    variant="bordered"
                    onPress={handleRefundOpen}
                  >
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    variant="shadow"
                    size="lg"
                    onPress={handleRefund}
                    isLoading={isRequestingRefund}
                  >
                    {isRequestingRefund ? "" : "Refund"}
                  </Button>
                </>
              )}
              {!isRefundOpen && isRefundable && isSuccess && (
                <Button
                  color="primary"
                  variant="shadow"
                  size="lg"
                  onPress={handleRefundOpen}
                >
                  Request Refund
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
