import React, { useState } from "react";
import { findLastIndex } from "../../utils/helpers";

interface OtpInputProps {
  length: number;
  id: string | number;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  isNumeric?: boolean;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  id,
  autoFocus = true,
  isNumeric = true,
  inputStyle = {},
  containerStyle = {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  // Handle input change for each OTP digit
  const handleChange = (value: string, index: number) => {
    if (isNumeric && !/^\d*$/.test(value)) return; // Only allow numeric input if isNumeric is true

    const newOtp = [...otp];
    newOtp[index] = value; // Update the current OTP digit

    setOtp(newOtp);
    onChange(newOtp.join("")); // Send the full OTP back to the parent component

    if (value && index < length - 1) {
      setTimeout(() => {
        document.getElementById(`otp-input-${id}-${index + 1}`)?.focus(); // Move focus to the next input
      }, 0);
    }
  };

  // Handle pasting input into OTP fields
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (isNumeric && !/^\d*$/.test(pasteData)) return; // Check if pasted data is numeric

    const pasteOtp = pasteData.slice(0, length).split(""); // Limit pasted characters to OTP length
    setOtp(pasteOtp);
    onChange(pasteOtp.join("")); // Update the OTP state

    // Focus the last filled input after paste
    const lastFilledIndex = pasteOtp.findIndex((val) => val === "") - 1;
    if (lastFilledIndex >= 0) {
      document.getElementById(`otp-input-${id}-${lastFilledIndex}`)?.focus();
    }
  };

  // Handle key events for backspace functionality
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = ""; // Clear the current input if filled
        setOtp(newOtp);
        onChange(newOtp.join("")); // Update OTP in parent
        setTimeout(() => {
          document.getElementById(`otp-input-${id}-${index}`)?.focus(); // Focus the current input
        }, 0);
      } else if (index > 0) {
        const previousIndex = index - 1;
        newOtp[previousIndex] = ""; // Clear the previous input
        setOtp(newOtp);
        onChange(newOtp.join("")); // Update OTP in parent
        setTimeout(() => {
          document.getElementById(`otp-input-${id}-${previousIndex}`)?.focus(); // Move focus to the previous input
        }, 0);
      }
    }
  };

  // Handle focus behavior to ensure user can't click on filled inputs that aren't the last one
  const handleFocus = (index: number) => {
    const isFilled = otp[index] !== "";
    const lastFilledIndex = findLastIndex(otp, (value) => value !== "");

    if (isFilled && index !== lastFilledIndex) {
      // Prevent focus if current input is filled but not the last filled one
      const previousIndex = lastFilledIndex; // Set focus to the last filled input
      document.getElementById(`otp-input-${id}-${previousIndex}`)?.focus();
    }
  };

  return (
    <div
      className="flex items-center gap-4 justify-center"
      style={containerStyle}
    >
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${id}-${index}`}
          type={isNumeric ? "password" : "text"} // Use password type for numeric OTP
          value={value}
          onChange={(e) => handleChange(e.target.value, index)} // Handle input changes
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle key events
          onPaste={handlePaste} // Handle paste events
          onFocus={() => handleFocus(index)} // Manage focus behavior
          maxLength={1} // Allow only 1 character per input
          autoFocus={autoFocus && index === 0} // Auto-focus on the first input
          className={`transition-all duration-300 bg-white w-12 h-12 lg:w-16 lg:h-16 border-2 rounded-lg outline-none shadow-sm text-lg lg:text-xl font-semibold tracking-wider ${
            value ? "border-primary" : "border-gray-300"
          } text-center focus:border-blue-500 focus:ring-2 ring-blue-300 ${
            index === 0 || otp[index - 1]
              ? "cursor-text pointer-events-auto"
              : "cursor-not-allowed pointer-events-none"
          }`}
          style={{
            ...inputStyle,
            color: otp[index] ? "#000" : "#A0AEC0", // Change color based on input state
            transition: "border-color 0.3s ease, background-color 0.3s ease", // Smooth transitions
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
