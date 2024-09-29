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
import { useState } from "react";
import useGenerateLink from "./services/useGenerateLink";
import { toast } from "react-toastify";

export default function CreatePaymentLinkModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void; // Adjusted type definition
}) {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading, refetch } = useGenerateLink({
    customer_name: name,
    customer_email: email,
    narration: description,
    amount,
  });

  const handleClose = () => {
    onOpenChange();
    setAmount("");
    setDescription("");
    setEmail("");
    setName("");
  };

  const handleSubmit = () => {
    // Handle form submission
    const numericAmount = +amount;

    if (
      !numericAmount ||
      numericAmount <= 0 ||
      email.length < 4 ||
      name.length === 0 ||
      description.length === 0
    ) {
      toast.error("Please make sure all fields are filled");
      return;
    }
    refetch();
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
      <ModalContent className="p-3">
        <ModalHeader className="flex flex-col text-2xl text-primary font-semibold gap-1 items-center">
          Create Payment Link
        </ModalHeader>
        <ModalBody className="p-4">
          <p className="text-lg text-center lg:text-xl font-medium">
            {data?.data
              ? "Click to Copy"
              : "Create a link to allow users to pay for your product."}
          </p>
          <div className="py-6 w-full space-y-4 max-w-xs md:max-w-lg">
            {data?.data ? (
              <div className="flex items-center w-full justify-center">
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(data?.data);
                    toast.success("Payment link copied to clipboard!"); // Notify user
                  }}
                  className="cursor-pointer  text-center text-lg font-semibold text-blue-600 hover:underline"
                >
                  {data.data}
                </span>
              </div>
            ) : (
              <>
                <Input
                  name="amount"
                  value={amount} // Bind input value to state
                  onChange={(e) => setAmount(e.target.value)} // Update state on change
                  placeholder="Amount"
                  labelPlacement="outside"
                  isRequired
                  aria-label="Amount"
                  variant="bordered"
                  size="lg"
                  type="text"
                />
                <Input
                  name="name"
                  value={name} // Bind input value to state
                  onChange={(e) => setName(e.target.value)} // Update state on change
                  placeholder="Customer name"
                  labelPlacement="outside"
                  isRequired
                  variant="bordered"
                  aria-label="Customer Name"
                  size="lg"
                  type="text"
                />
                <Input
                  name="email"
                  value={email} // Bind input value to state
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  placeholder="Customer Email"
                  labelPlacement="outside"
                  isRequired
                  aria-label="Customer Email"
                  size="lg"
                  type="text"
                />
                <Textarea
                  aria-label="Description"
                  isRequired
                  name="description"
                  variant="bordered"
                  value={description} // Bind textarea value to state
                  onChange={(e) => setDescription(e.target.value)} // Update state on change
                  placeholder="Enter your description"
                  size="lg"
                  labelPlacement="outside"
                />
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="items-center flex justify-end">
          <Button
            color="danger"
            isDisabled={isLoading}
            variant="bordered"
            onPress={handleClose}
          >
            Cancel
          </Button>
          {!data?.data && (
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Create Link
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
