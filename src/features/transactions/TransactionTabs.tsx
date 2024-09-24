import { Key, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";


type TransactionTabsProps = {
  currentTab: string;
  setCurrentTab: (tab: Key) => void;
};

export default function TransactionTabs({ currentTab, setCurrentTab }: TransactionTabsProps) {
  const tabs = ["all", "incoming", "outgoing", "refunded"]; // Your tabs

  const handleTabChange = (tab: Key) => {
    setCurrentTab(tab); 
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Tabs
        aria-label="Transaction Tabs"
        size="lg"
        color="primary"
        selectedKey={currentTab}
        onSelectionChange={handleTabChange}
      >
        {tabs.map((tab) => <Tab className="capitalize" key={tab} value={tab} title={tab}/>)}
      </Tabs>
    </div>
  );
}



