import { Tab, Tabs } from "@nextui-org/react";
import ChangePassword from "../features/auth/ChangePassword";

export default function AccountSettings() {
  return (
    <div className="flex w-full flex-col px-6 py-4">
    <Tabs size="lg" aria-label="Options" color="primary" >
      <Tab key="account" title="Change Password">
        <ChangePassword/>
      </Tab>
      
    </Tabs>
  </div>  
  )
}
