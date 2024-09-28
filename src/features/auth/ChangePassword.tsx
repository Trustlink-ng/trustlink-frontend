import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CustomInput from "../../components/CustomInput";
import useChangePassword from "./services/useChangePassword";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { mutate, isPending } = useChangePassword();

  const [errors, setErrors] = useState({
    old_password: "",
    new_password: "",
    confirm: "",
  });

  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityOld = () => setIsVisibleOld(!isVisibleOld);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (oldPassword.length < 8) {
      newErrors.old_password = "Password must be at least 8 characters";
      valid = false;
    } else {
      newErrors.old_password = "";
    }

    if (newPassword.length < 8) {
      newErrors.new_password = "Password must be at least 8 characters";
      valid = false;
    } else {
      newErrors.new_password = "";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
      valid = false;
    } else {
      newErrors.confirm = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      mutate({
        old_password: oldPassword,
        new_password: newPassword,
        confirm: confirmPassword,
      }, {
        onSuccess: () => {
          setNewPassword("")
          setConfirmPassword("")
          setOldPassword("")
        }
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center lg:items-start justify-center flex-col">
      <div className="h-full w-full lg:max-w-full flex items-center lg:items-start justify-center lg:px-36 gap-2 lg:gap-3 flex-col lg:py-12">
        <div className="w-full">
          <h1 className="lg:text-4xl text-xl font-medium">Change Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <p className="text-slate-500">
            Fill the form below to reset your password
          </p>
          <div className="py-6 space-y-4 max-w-sm">
            <CustomInput
              placeholder="Current Password"
              name="old_password"
              value={oldPassword}
              handleChange={(e) => setOldPassword(e.target.value)}
              type={isVisibleOld ? "text" : "password"}
              startIcon={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              endIcon={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityOld}
                  aria-label="toggle password visibility"
                >
                  {isVisibleOld ? (
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
            />
            <CustomInput
              placeholder="New Password"
              name="new_password"
              value={newPassword}
              handleChange={(e) => setNewPassword(e.target.value)}
              type={isVisibleNew ? "text" : "password"}
              startIcon={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              endIcon={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityNew}
                  aria-label="toggle password visibility"
                >
                  {isVisibleNew ? (
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
            />
            <CustomInput
              handleChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              name="confirm"
              value={confirmPassword}
              type={isVisibleConfirm ? "text" : "password"}
              startIcon={
                <CiLock
                  color="#264653"
                  className="text-xl text-default-400 pointer-events-none flex-shrink-0 "
                />
              }
              endIcon={
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
            />
            <Button
              className="text-white w-full"
              color="primary"
              size="lg"
              name="submit"
              type="submit"
              isLoading={isPending}
              isDisabled={isPending}
            >
              Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
