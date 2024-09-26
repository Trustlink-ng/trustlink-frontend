import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPaperPlaneOutline } from "react-icons/io5";
import TransferFromWalletModal from "./TransferFromWalletModal"; // Import your transfer modal

export default function Transfer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

  const handleOpen = () => {
    setIsOpen(true); // Open the modal
    navigate("/transfer"); // Change the route to signify the transfer action
  };

  const handleClose = () => {
    setIsOpen(false); // Close the modal
    navigate("/"); // Navigate to another route (e.g., home)
  };

  // Optionally, if you want to handle the case when the component mounts
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/transfer") {
      setIsOpen(true); // Open the modal if the path matches
    }
  }, []);

  return (
    <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center" onClick={handleOpen}>
      <IoPaperPlaneOutline className="text-xl" />
      <p className="text-sm font-medium">Transfer</p>
      <TransferFromWalletModal isOpen={isOpen} onOpenChange={handleClose} /> {/* Include the transfer modal */}
    </div>
  );
}
