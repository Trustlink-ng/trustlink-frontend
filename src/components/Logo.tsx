import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div className="md:max-w-lg my-4">
      <h1
        onClick={() => navigate("/")}
        className="text-primary text-2xl cursor-pointer items-center text-left flex gap-2 font-semibold leading-none lg:text-3xl"
      >
        <img src="/Logo.svg" alt="Trustlink" className="lg:w-6" />
        TrustLink
      </h1>
    </div>
  );
}
