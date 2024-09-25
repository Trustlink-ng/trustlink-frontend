import { Key } from "react";
import { Tab, Tabs } from "@nextui-org/react";

type TransactionTabsProps = {
  currentTab: string | null;
  setCurrentTab: (tab: string) => void;
};

export default function TransactionTabs({ currentTab, setCurrentTab }: TransactionTabsProps) {
  const tabs = ["all", "incoming", "outgoing"]; // Your tabs

  const handleTabChange = (tab: Key) => {
    setCurrentTab(tab as string); // Typecast to string since tabs are strings
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
        {tabs.map((tab) => (
          <Tab className="capitalize" key={tab} value={tab} title={tab} />
        ))}
      </Tabs>
    </div>
  );
}
