import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoMail } from "react-icons/io5";
import { useFlow } from "./context/FlowContext";
import { Navigate } from "react-router-dom";

export default function RequestPasswordReset() {
  const { isValidFlow } = useFlow();

  
  const [formData, setFormData] = useState({
    email: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
  });
  if (!isValidFlow) {
    // If the user didn't come from the correct flow, redirect to homepage
    return <Navigate to="/" replace />;
  }
  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email.includes("@")) {
      newErrors.email = "Email must be valid";
      valid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log(formData);
      // You can add your form submission logic here (e.g., API call)
      // mutate(formData);
      // reset();
    }
  };

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] md:max-w-[50%] lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full md:max-w-lg my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl  ">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div className="w-full">
          <h1 className="lg:text-4xl text-xl font-medium">Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <p className="text-slate-500">
            Fill the form below to reset your password
          </p>
          <div className="py-6 space-y-4 max-w-xs md:max-w-sm">
            <Input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              startContent={
                <IoMail
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              size="lg"
            />
            <Button
              className="bg-primary w-full font-semibold rounded-none"
              size="lg"
              name="submit"
              type="submit"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
