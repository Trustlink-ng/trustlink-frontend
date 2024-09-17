import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };


    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
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
        <form onSubmit={handleSubmit}>
          <p className="text-slate-500">
            Fill the form below to reset your password
          </p>
          <div className="py-6 space-y-4 max-w-xs md:max-w-lg lg:max-w-full">
            <Input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              startContent={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <FaRegEyeSlash
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FaRegEye
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              className="w-full"
              size="lg"
              classNames={{
                input: [" outline-none focus:outline-none"],
                innerWrapper: "bg-white hover:bg-white focus:bg-white",
                inputWrapper: [
                  "border-2 border-primary bg-white data-[hover=true]:bg-white data-[invalid=true]:border-red-500 data-[invalid=true]:bg-white group-data-[focus=true]/input:bg-white",
                ],
              }}
            />
            <Input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={isVisibleConfirm ? "text" : "password"}
              startContent={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              classNames={{
                input: [" outline-none focus:outline-none"],
                innerWrapper: "bg-white hover:bg-white focus:bg-white",
                inputWrapper: [
                  "border-2 border-primary bg-white data-[hover=true]:bg-white group-data-[focus=true]/input:bg-white",
                ],
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConfirm}
                  aria-label="toggle password visibility"
                >
                  {isVisibleConfirm ? (
                    <FaRegEyeSlash
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  ) : (
                    <FaRegEye
                      color="#264653"
                      className="text-xl text-default-400 pointer-events-none"
                    />
                  )}
                </button>
              }
              className="w-full"
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
