import React, { useState } from "react";

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  isNumeric?: boolean;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  autoFocus = true,
  isNumeric = true,
  inputStyle = {},
  containerStyle = {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (isNumeric && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus the next input after filling the current one
    if (value && index < length - 1) {
      setTimeout(() => {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }, 10); // Slight timeout to ensure the value is set before focus
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (isNumeric && !/^\d*$/.test(pasteData)) return;

    const pasteOtp = pasteData.slice(0, length).split("");
    setOtp(pasteOtp);
    onChange(pasteOtp.join(""));

    // Focus the last filled input
    const lastFilledIndex = pasteOtp.length - 1;
    if (lastFilledIndex < length - 1) {
      document.getElementById(`otp-input-${lastFilledIndex + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const previousIndex = index - 1;
      document.getElementById(`otp-input-${previousIndex}`)?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (index > 0 && !otp[index - 1]) {
      // Prevent focus if the previous input is empty
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  return (
    <div className={`flex items-center gap-3`} style={{ ...containerStyle }}>
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type={isNumeric ? "text" : "tel"}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)} // Prevent cursor focus on empty inputs
          maxLength={1}
          autoFocus={autoFocus && index === 0}
          className={`bg-transparent border-2 rounded-md outline-none ${
            value ? "border-primary" : "border-gray-400"
          }`}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "20px",
            ...inputStyle,
            pointerEvents: index > 0 && !otp[index - 1] ? "none" : "auto", // Disable pointer events for non-clickable inputs
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
