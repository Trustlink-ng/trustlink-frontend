import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbNewSection } from "react-icons/tb";
import CreatePaymentLinkModal from "./CreatePaymentLinkModal";

export default function CreatePaymentLink() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

  const handleOpen = () => {
    setIsOpen(true); // Open the modal
    navigate("/create-payment-link"); // Change the route
  };

  const handleClose = () => {
    setIsOpen(false); // Close the modal
    navigate("/"); // Navigate to another route (e.g., home)
  };

  // Optionally, if you want to handle the case when the component mounts
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/create-payment-link") {
      setIsOpen(true); // Open the modal if the path matches
    }
  }, []);

  return (
    <div className="flex cursor-pointer flex-col items-center w-full gap-2 text-center rounded-md hover:bg-blue-100 p-2 justify-center">
      <div>
        <TbNewSection className=" text-xl lg:text-3xl" color="" onClick={handleOpen} />
      </div>
      <p className="text-sm lg:text-base font-medium" onClick={handleOpen}>
        Create Link
      </p>
      <CreatePaymentLinkModal isOpen={isOpen} onOpenChange={handleClose} />
    </div>
  );
}
