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

export default function CreatePaymentLinkModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void; // Adjusted type definition
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    console.log("Payment Link Created", { amount, description });
    // Here you could send this data to your backend or perform any action
    // After submission, you might want to reset the fields and close the modal
    setAmount("");
    setDescription("");
    onOpenChange(); // Close the modal
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange} // This will close the modal when triggered
    >
      <ModalContent className="p-3">
        <ModalHeader className="flex flex-col text-xl font-semibold gap-1 items-center">
          Create Payment Link
        </ModalHeader>
        <ModalBody className="p-4">
          <p className="text-lg font-medium">
            Create a link to allow users to pay for your product.
          </p>
          <div className="py-6 w-full space-y-4 max-w-xs md:max-w-lg">
            <Input
              name="amount"
              value={amount} // Bind input value to state
              onChange={(e) => setAmount(e.target.value)} // Update state on change
              placeholder="Amount"
              labelPlacement="outside"
              isRequired
              label="Amount"
              size="lg"
              type="text"
            />
            <Textarea
              label="Description"
              isRequired
              name="description"
              value={description} // Bind textarea value to state
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              placeholder="Enter your description"
              size="lg"
              labelPlacement="outside"
            />
          </div>
        </ModalBody>
        <ModalFooter className="items-center flex justify-end">
          <Button color="danger" variant="bordered" onPress={onOpenChange}>
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Create Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
