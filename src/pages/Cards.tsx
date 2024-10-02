import { Tab, Tabs } from "@nextui-org/react";
import PaymentForm from "../features/cards/PaymentForm";

export default function Cards() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-4 overflow-auto">
      <Tabs size="lg" aria-label="Options" color="primary">
        <Tab key="account" title="Card Deposit">
          <div className="w-full text-primary my-5 flex justify-center">
            <PaymentForm />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
