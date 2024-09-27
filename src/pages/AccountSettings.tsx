import { Tab, Tabs } from "@nextui-org/react";
import ChangePassword from "../features/auth/ChangePassword";

export default function AccountSettings() {
  return (
    <div className="flex w-full flex-col px-6">
    <Tabs size="lg" aria-label="Options" color="primary" variant="underlined" classNames={{cursor: "h-1", tabContent: "text-lg"}}>
      <Tab key="account" title="Change Password">
        <ChangePassword/>
      </Tab>
      
    </Tabs>
  </div>  
  )
}
