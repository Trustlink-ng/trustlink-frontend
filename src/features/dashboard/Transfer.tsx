import { IoPaperPlaneOutline } from "react-icons/io5";

export default function Transfer() {
  return (
    <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
      <IoPaperPlaneOutline className="text-xl" />
      <p className="text-sm font-medium">Transfer</p>
    </div>
  );
}
