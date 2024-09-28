import React, { useState } from "react";

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

  const handleChange = (value: string, index: number) => {
    if (isNumeric && !/^\d*$/.test(value)) return; // Only allow numbers if isNumeric is true

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    onChange(newOtp.join("")); // Send OTP back to parent

    // Focus the next input after filling the current one
    if (value && index < length - 1) {
      setTimeout(() => {
        document.getElementById(`otp-input-${id}-${index + 1}`)?.focus();
      }, 10); // Ensure value is set before moving to the next input
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (isNumeric && !/^\d*$/.test(pasteData)) return; // Handle numeric-only restriction

    const pasteOtp = pasteData.slice(0, length).split(""); // Limit the pasted characters to the OTP length
    setOtp(pasteOtp);
    onChange(pasteOtp.join(""));

    // Focus the last filled input after paste
    const lastFilledIndex = pasteOtp.length - 1;
    if (lastFilledIndex < length - 1) {
      document.getElementById(`otp-input-${id}-${lastFilledIndex + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const previousIndex = index - 1;
      document.getElementById(`otp-input-${id}-${previousIndex}`)?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (index > 0 && !otp[index - 1]) {
      // Prevent focus if the previous input is empty
      document.getElementById(`otp-input-${id}-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="flex items-center gap-3" style={containerStyle}>
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${id}-${index}`} // Fix ID generation without spaces
          type={isNumeric ? "password" : "text"} // Use "text" instead of "tel" for non-numeric input
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)} // Prevent focus on empty inputs
          maxLength={1}
          autoFocus={autoFocus && index === 0} // Auto-focus on the first input
          className={`bg-transparent border-2 rounded-md outline-none ${
            value ? "border-primary" : "border-gray-400"
          } focus:border-blue-500`} // Add focus border styling
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "50px",
            ...inputStyle,
            pointerEvents: index > 0 && !otp[index - 1] ? "none" : "auto", // Disable pointer events for empty inputs
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
