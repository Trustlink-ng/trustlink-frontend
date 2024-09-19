import { Input } from "@nextui-org/react";
import React, { ReactNode } from "react";

interface CustomInputProps {
  name: string;
  value: string;
  placeholder: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: ReactNode; // Start icon (left side)
  endIcon?: ReactNode; // End icon (right side)
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  type = "text",
  value,
  handleChange,
  startIcon,
  endIcon,
}) => (
  <Input
    placeholder={placeholder}
    type={type}
    name={name}
    value={value}
    onChange={handleChange}
    startContent={startIcon}
    endContent={endIcon}
    size="lg"
  />
);

export default CustomInput;
