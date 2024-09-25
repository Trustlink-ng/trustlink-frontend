import { Button } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { LoginCredentials } from "../../utils/types";
import { toast } from "react-toastify";
import useLogin from "./services/useLogin";
import CustomInput from "../../components/CustomInput";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { mutate, isPending } = useLogin();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

    if (formData.username.length < 2) {
      newErrors.username = "Firstname must be at least 2 characters";
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

    setErrors(newErrors);

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof typeof newErrors]) {
        toast.error(newErrors[key as keyof typeof newErrors], { toastId: key });
      }
    });

    return valid;
  }, [formData, errors]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (validateStep1()) {
        const newData: LoginCredentials = {
          id: formData.username,
          password: formData.password,
        };

        mutate(newData);
      }
    },
    [validateStep1, formData, mutate]
  );

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full max-w-[60%] lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full my-4">
          <h1 className="text-primary text-2xl text-left flex gap-2 font-semibold lg:text-2xl  ">
            <img src="/Logo.svg" alt="Trustlink" /> Trustlink
          </h1>
        </div>
        <div>
          <h1 className="lg:text-4xl text-xl font-medium">
            Good to see you again today!👋
          </h1>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <p className="text-slate-500">Sign in to your account to continue</p>
          <div className="py-6 w-full space-y-4 max-w-xs md:max-w-sm">
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
                  {isVisible ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
                </button>
              }
            />
            <div className="flex justify-end">
              <p
                className="font-medium text-primary cursor-pointer text-sm hover:opacity-80"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>
            </div>
            <Button
              className="bg-primary w-full outline-none rounded-none font-semibold data-[focus-visible=true]:outline-0 text-white"
              size="lg"
              name="submit"
              type="submit"
              isLoading={isPending}
            >
              {isPending ? " " : "Sign in"}
            </Button>
            <div className="flex justify-start">
              <p className="font-medium text-sm">
                Don't have an account?{" "}
                <span
                  className="font-medium text-primary cursor-pointer hover:opacity-80"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
