import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { IoMail, IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsTelephoneForward } from "react-icons/bs";
import useRegister from "./services/useRegister";
import { RegisterCredentials } from "../../utils/types";
import CustomInput from "../../components/CustomInput";
import { toast } from "react-toastify";
import Logo from "../../components/Logo";

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

  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const { mutate, isPending } = useRegister();

  const handleNavigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = useCallback(
    () => setIsVisibleConfirm((prev) => !prev),
    []
  );

  // Memoized input change handler with debouncing
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  // Step 1 validation
  const validateStep1 = useCallback(() => {
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

    if (formData.telephone.length < 10) {
      newErrors.telephone = "Telephone must be at least 10 digits";
      valid = false;
    } else {
      newErrors.telephone = "";
    }

    setErrors(newErrors);

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof typeof newErrors]) {
        toast.error(newErrors[key as keyof typeof newErrors], { toastId: key });
      }
    });

    return valid;
  }, [formData, errors]);

  // Step 2 validation
  const validateStep2 = useCallback(() => {
    let valid = true;
    const newErrors = { ...errors };

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    } else {
      newErrors.username = "";
    }

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

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof typeof newErrors]) {
        toast.error(newErrors[key as keyof typeof newErrors], { toastId: key });
      }
    });

    return valid;
  }, [formData, errors]);


  const handleNextStep = useCallback(() => {
    if (validateStep1()) {
      setStep(2);
    } 
  }, [validateStep1]);

  const handlePreviousStep = useCallback(() => {
    setStep(1);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (validateStep2()) {
        const newData: RegisterCredentials = {
          firstName: formData.firstname,
          lastName: formData.lastname,
          phone: formData.telephone,
          ...formData,
        };

        mutate(newData);
      }
    },
    [validateStep2, formData, mutate]
  );

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] md:max-w-[50%] lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <Logo/>
        <div className="w-full">
          <h1 className="lg:text-4xl text-xl font-medium">
            Control Your Payments, Join Us Today!
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <p className="text-slate-500">
            Fill the form below to create an account
          </p>

          {step === 1 && (
            <div className="py-6 space-y-6 max-w-xs md:max-w-sm">
              <div className="flex gap-2">
                <CustomInput
                  name="firstname"
                  value={formData.firstname}
                  placeholder="Firstname"
                  type="text"
                  handleChange={handleChange}
                />
                <CustomInput
                  name="lastname"
                  value={formData.lastname}
                  placeholder="Lastname"
                  type="text"
                  handleChange={handleChange}
                />
              </div>
              <CustomInput
                name="email"
                value={formData.email}
                placeholder="Email"
                type="email"
                handleChange={handleChange}
                startIcon={<IoMail color="#264653" className="text-xl" />}
              />
              <CustomInput
                name="telephone"
                value={formData.telephone}
                placeholder="Telephone"
                type="telephone"
                handleChange={handleChange}
                startIcon={
                  <BsTelephoneForward color="#264653" className="text-xl" />
                }
              />
              <Button
                onClick={handleNextStep}
                className="bg-primary outline-none font-semibold data-[focus-visible=true]:outline-0 text-white w-full rounded-none"
                size="lg"
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="py-6 space-y-6 w-full max-w-xs md:max-w-sm">
              <CustomInput
                name="username"
                value={formData.username}
                placeholder="Username"
                type="text"
                handleChange={handleChange}
                startIcon={
                  <IoPersonOutline color="#264653" className="text-xl" />
                }
              />

              <div className="flex gap-2">
                <CustomInput
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  type={isVisible ? "text" : "password"}
                  handleChange={handleChange}
                  startIcon={<CiLock color="#264653" className="text-xl" />}
                  endIcon={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  }
                />
                <CustomInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  type={isVisibleConfirm ? "text" : "password"}
                  handleChange={handleChange}
                  startIcon={<CiLock color="#264653" className="text-xl" />}
                  endIcon={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  }
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
                  isLoading={isPending}
                  className="bg-primary font-semibold w-full rounded-none"
                  size="lg"
                >
                  {isPending ? "" : "Register"}
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-start">
            <p className="font-medium text-sm">
              Already have an account?{" "}
              <span
                className="font-medium text-primary cursor-pointer hover:opacity-80"
                onClick={handleNavigateToLogin}
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
