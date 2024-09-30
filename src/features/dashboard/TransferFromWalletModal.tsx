import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import OtpInput from "../auth/OtpInput";
import useTransfer from "../wallet/services/useTransfer";
import useGetWallet from "../wallet/services/useGetWallet";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function TransferFromWalletModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void; // Adjusted type definition
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to disable button

  const [otp, setOtp] = useState(""); // State for OTP
  const { mutate, isPending } = useTransfer();
  const { data } = useGetWallet();
  const wallet = data?.wallet;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (recipient && amount && description && otp.length == 4) {
      setIsButtonDisabled(false); // Enable button if all fields are filled
    } else {
      setIsButtonDisabled(true); // Disable button if any field is empty
    }
  }, [recipient, amount, description, otp]); // Run whenever any input changes

  const handleSubmit = () => {
    // Ensure amount is converted to a number before comparison
    const numericAmount = +amount;

    // Check if amount is greater than wallet balance
    if (numericAmount > (wallet?.balance ?? 0)) {
      toast.error("Insufficient funds in your wallet."); // Alert user of insufficient funds
      return; // Ensure the function stops execution here
    }

    // If amount is valid and less than or equal to wallet balance, proceed with mutate
    mutate(
      {
        recipient: recipient,
        amount: numericAmount,
        description: description,
        pin: otp,
      },
      {
        onSuccess: () => {
          setAmount("");
          setDescription("");
          setOtp("");
          onOpenChange();
          queryClient.invalidateQueries({ queryKey: ["wallet"] }); // R}}efresh wallet balance
          queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Refresh transaction history
        },
      }
    );
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      isDismissable={false}
      scrollBehavior="outside"
      backdrop="opaque"
      onOpenChange={onOpenChange} // This will close the modal when triggered
    >
      <ModalContent className="p-2 lg:p-3">
        <ModalHeader className="flex flex-col text-2xl text-primary font-semibold gap-1 items-center">
          Transfer from Wallet
        </ModalHeader>
        <ModalBody className="px-4 py-1">
          <p className="text-lg font-medium">
            Transfer funds with various users on the platform{" "}
          </p>
          <div className="py-6 w-full lg:space-y-4 max-w-xs md:max-w-lg">
            <Input
              name="recipient"
              value={recipient} // Bind input value to state
              onChange={(e) => setRecipient(e.target.value)} // Update state on change
              placeholder="Recipient"
              labelPlacement="outside"
              isRequired
              label="Recipient"
              variant="bordered"
              className="py-3"
              size="lg"
              type="text"
              isDisabled={isPending} // Disable input when loading
            />
            <Input
              name="amount"
              value={amount} // Bind input value to state
              onChange={(e) => setAmount(e.target.value)} // Update state on change
              placeholder="Amount"
              labelPlacement="outside"
              className="py-3"
              isRequired
              label="Amount"
              variant="bordered"
              size="lg"
              startContent={<TbCurrencyNaira size={25} />}
              type="text"
              isDisabled={isPending} // Disable input when loading
            />
            <Textarea
              label="Description"
              isRequired
              variant="bordered"
              name="description"
              value={description} // Bind textarea value to state
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              placeholder="Enter your description"
              size="lg"
              labelPlacement="outside"
              isDisabled={isPending} // Disable textarea when loading
            />
            {/* OTP Input Section */}
            <div className="flex flex-col gap-3 items-center justify-center">
              <p className="text-lg font-medium">Input your transaction pin</p>
              <OtpInput
                id="transfer"
                onChange={setOtp} // Update OTP state when changed
                length={4} // Number of OTP inputs
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="items-center flex justify-end">
          <Button color="danger" variant="bordered" onPress={onOpenChange}>
            Cancel
          </Button>
          <Button
            isDisabled={isButtonDisabled}
            color="primary"
            onPress={handleSubmit}
            isLoading={isPending}
          >
            {isPending ? "" : "Transfer"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
