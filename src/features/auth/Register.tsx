import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { IoMail, IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsTelephoneForward } from "react-icons/bs";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // State to track the step
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (formData.firstname.length < 2) {
      newErrors.firstname = "Firstname must be at least 2 characters";
      valid = false;
    } else {
      newErrors.firstname = "";
    }

    if (formData.lastname.length < 2) {
      newErrors.lastname = "Lastname must be at least 2 characters";
      valid = false;
    } else {
      newErrors.lastname = "";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Email must be valid";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (formData.telephone.length < 10) {
      newErrors.telephone = "Telephone must be at least 10 digits";
      valid = false;
    } else {
      newErrors.telephone = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
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

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep2()) {
      console.log(formData);
      // Add form submission logic (e.g., API call)
    }
  };

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] md:max-w-[50%] lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full md:max-w-lg my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div className="w-full">
          <h1 className="lg:text-4xl text-xl font-medium">
            Control Your Payments, Join Us Today!
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="text-slate-500">
            Fill the form below to create an account
          </p>

          {step === 1 && (
            <div className="py-6 space-y-6 max-w-xs md:max-w-lg lg:max-w-full">
              <div className="flex gap-2">
                <Input
                  placeholder="Firstname"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  size="lg"
                />
                <Input
                  placeholder="Lastname"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  size="lg"
                />
              </div>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                startContent={<IoMail color="#264653" className="text-xl" />}
                size="lg"
              />
              <Input
                placeholder="Telephone"
                type="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                startContent={
                  <BsTelephoneForward color="#264653" className="text-xl" />
                }
                size="lg"
              />
              <Button
                onClick={handleNextStep}
                className="bg-primary font-semibold w-full rounded-none"
                size="lg"
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="py-6 space-y-6 w-full max-w-xs md:max-w-lg lg:max-w-[90%]">
              <Input
                placeholder="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                startContent={
                  <IoPersonOutline color="#264653" className="text-xl" />
                }
                size="lg"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={isVisible ? "text" : "password"}
                  startContent={<CiLock color="#264653" className="text-xl" />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaRegEyeSlash color="#264653" className="text-xl" />
                      ) : (
                        <FaRegEye color="#264653" className="text-xl" />
                      )}
                    </button>
                  }
                  size="lg"
                />
                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={isVisibleConfirm ? "text" : "password"}
                  startContent={<CiLock color="#264653" className="text-xl" />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? (
                        <FaRegEyeSlash color="#264653" className="text-xl" />
                      ) : (
                        <FaRegEye color="#264653" className="text-xl" />
                      )}
                    </button>
                  }
                  size="lg"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handlePreviousStep}
                  className="bg-transparent border-2 w-full  border-primary font-semibold rounded-none"
                  size="lg"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-primary font-semibold w-full rounded-none"
                  size="lg"
                >
                  Register
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-start">
            <p className="font-medium text-sm">
              Already have an account?{" "}
              <span
                className="font-medium text-primary cursor-pointer hover:opacity-80"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
