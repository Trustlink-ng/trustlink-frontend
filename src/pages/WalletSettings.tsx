import {Tabs, Tab} from "@nextui-org/react";
import AddBankAccount from "../features/settings/AddBankAccount";
import UpdateTransactionPin from "../features/settings/UpdateTransactionPin";

export default function WalletSettings() {
  return (
    <div className="flex w-full flex-col px-6 py-4">
      <Tabs size="lg" aria-label="Options" color="primary" >
        <Tab key="account" title="Bank Account">
          <AddBankAccount/>
        </Tab>
        <Tab key="pin" title="Transaction Pin">
          <UpdateTransactionPin/> 
        </Tab>
      </Tabs>
    </div>  
  );
}