import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div className="w-full md:max-w-lg my-4">
      <h1
        onClick={() => navigate("/")}
        className="text-primary text-2xl cursor-pointer text-left flex gap-2 font-semibold leading-none lg:text-2xl"
      >
        <img src="/Logo.svg" alt="Trustlink" />
        TrustLink
      </h1>
    </div>
  );
}
