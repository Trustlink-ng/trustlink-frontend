import { Select, SelectItem } from "@nextui-org/react";
import { HiMenuAlt3 } from "react-icons/hi";

type FilterProps = {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
};

export default function Filter({ options, selectedValue, onSelectChange }: FilterProps) {
  return (
    <Select
      className="max-w-[200px] "
      selectedKeys={selectedValue ? [selectedValue] : undefined}
      onSelectionChange={(keys) => onSelectChange(keys.currentKey as string)}
      selectorIcon={<HiMenuAlt3 size={25} color="blue" />}
      aria-label="Filter"
    >
      {options.map((option) => (
        <SelectItem key={option.value} textValue={option.label}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
