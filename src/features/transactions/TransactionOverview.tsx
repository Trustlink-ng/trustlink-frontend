import { useEffect, useState } from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  ChipProps,
  Spinner,
} from "@nextui-org/react";
import { formatBalance } from "../../utils/helpers";
import useGetSingleTransactions from "./services/useGetSingleTransaction";
import OtpInput from "../auth/OtpInput";
import useVerifyTransaction from "./services/useVerifyTransaction";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useQueryClient } from "@tanstack/react-query";

export default function TransactionOverview() {
  const { id } = useParams<{ id: string }>(); // Get the transaction ID from the URL params
  const transID = id ? +id : 1;
  const { data, isLoading } = useGetSingleTransactions(transID);
  const [otp, setOtp] = useState(""); // Add OTP state
  const navigate = useNavigate(); // Initialize useNavigate
  const transaction = data?.data;
  const [isIncoming, setIsIncoming] = useState(false);
  const queryClient = useQueryClient(); // Access the QueryClient

  useEffect(() => {
    setIsIncoming(transaction?.type === "CREDIT" && transaction?.status !== "Completed");
  }, [transaction]);

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Pending: "warning",
    Completed: "success",
    Refunded: "danger",
  };

  // Pass the transaction ID to useVerifyTransaction
  const { mutate, isPending } = useVerifyTransaction(transID);

  const handleVerify = () => {
    if (otp.length === 4) {
      // Call mutate with OTP
      mutate(
        { code: otp },
        {
          onSuccess: () => {
            setIsIncoming(false);
            queryClient.invalidateQueries({ queryKey: ["wallet"] }); // R}}efresh wallet balance
            queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Refresh transaction history
          },
        }
      );
    } else {
      toast.error("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <div className="w-full h-full">
      <Breadcrumbs size="lg" color="primary" underline="active">
        <BreadcrumbItem
          key="transactions"
          isCurrent={false}
          onClick={() => navigate("/transactions")} // Navigate to transactions
        >
          Transactions
        </BreadcrumbItem>
        <BreadcrumbItem key={id} isCurrent={true}>
          Transaction Details
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-center justify-center p-6">
        <Card className="p-6 max-w-2xl w-[500px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 items-center">
              Transaction Details
            </div>
            <div className="w-full">
              {isLoading ? (
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
                  <div className="flex flex-col gap-4 mx-24">
                    <div className="flex font-semibold justify-between gap-6">
                      <p>From</p>
                      <p>
                        {transaction?.sender
                          ? transaction?.sender.firstName +
                            " " +
                            transaction?.sender.lastName
                          : "Kora Payment Link"}
                      </p>
                    </div>
                    <div className="flex font-semibold justify-between gap-6">
                      <p>To</p>
                      <p>
                        {transaction?.receiver
                          ? transaction?.receiver.firstName +
                            " " +
                            transaction?.receiver.lastName
                          : "Kora Payment Link"}
                      </p>
                    </div>
                    <div className="flex font-semibold justify-between gap-6">
                      <p>Description</p>
                      <p className="text-ellipsis overflow-hidden truncate">
                        {typeof transaction?.description === "string"
                          ? transaction?.description
                          : "--"}
                      </p>
                    </div>
                  </div>
                  {isIncoming && (
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <h2 className="font-semibold text-xl text-primary">
                        Enter the code from the customer
                      </h2>
                      <OtpInput length={4} onChange={setOtp} />{" "}
                      {/* Update OTP state when changed */}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="items-center flex justify-center">
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
