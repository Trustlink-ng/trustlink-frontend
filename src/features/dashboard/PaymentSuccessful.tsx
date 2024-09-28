import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // To get the reference from the URL
import { Button, Spinner } from "@nextui-org/react"; // Import Spinner if you need loading state
import { toast } from "react-toastify";
import axiosInstance from "../../utils/api";

interface TransactionResponse {
  message: string;
  data: {
    id: number;
    mode: string;
    sender?: string;
    receiver: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      username: string;
    };
    amount: number;
    description: string;
    date: string;
    status: string;
    type?: string;
  };
}

export default function PaymentSuccessful() {
  const [searchParams] = useSearchParams(); // Use searchParams to get the reference
  const reference = searchParams.get("reference"); // Get reference from URL
  const [transactionData, setTransactionData] =
    useState<TransactionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (reference) {
      const fetchTransactionData = async () => {
        try {
          const { data } = await axiosInstance.get<TransactionResponse>(
            `/api/checkout?reference=${reference}`
          );
          setTransactionData(data);
        } catch (error: unknown | string) {
          // Instead of handling the error, you toast a success message when the request fails
          toast.success(
            "Error confirming transaction. Login to your account to check for confirmation.",
            { toastId: error as string }
          );
          navigate("/");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactionData();
    }
  }, [reference, navigate]);

  if (loading) return <Spinner />; // Show a spinner while loading

  return (
    <div className="flex h-screen w-full justify-center bg-main items-center text-primary text-5xl">
      {transactionData ? (
        <>
          <div className="text-center">
            <h1>Payment Successful</h1>
            <Button
              className="bg-primary p-3"
              onPress={() =>
                navigate("/transactions/" + transactionData.data.id)
              }
            >
              View Details
            </Button>
          </div>
        </>
      ) : (
        <p>No transaction details found.</p>
      )}
    </div>
  );
}
