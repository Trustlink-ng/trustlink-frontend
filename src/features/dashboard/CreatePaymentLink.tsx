import { TbNewSection } from 'react-icons/tb'

export default function CreatePaymentLink() {
  return (
    <div className="flex cursor-pointer flex-col items-center rounded-md hover:bg-slate-200 p-2 justify-center">
            <TbNewSection className="text-xl" />
            <p className="text-sm font-medium">Create Link</p>
          </div>
  )
}
