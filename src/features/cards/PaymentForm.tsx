import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { TbCurrencyNaira } from "react-icons/tb";
import useCardDeposit from "./services/useCardDeposit";
import { Spinner } from "@nextui-org/react";

type Focused = "number" | "name" | "expiry" | "cvc" | "";

interface CardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

const PaymentForm: React.FC = () => {
  const [state, setState] = useState<CardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [amount, setAmount] = useState("");
  const { mutate: depositCard, isPending } = useCardDeposit();

  // Handle input changes
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    if (name === "number") {
      const formattedNumber = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setState((prev) => ({ ...prev, [name]: formattedNumber }));
    } else if (name === "expiry") {
      let formattedExpiry = value.replace(/\D/g, "");
      if (formattedExpiry.length > 2) {
        formattedExpiry =
          formattedExpiry.slice(0, 2) + "/" + formattedExpiry.slice(2, 4);
      }
      setState((prev) => ({ ...prev, [name]: formattedExpiry }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    depositCard(
      {
        number: state.number,
        expiry: state.expiry,
        amount: +amount,
        cvv: state.cvc,
        name: state.name,
      },
      {
        onSuccess: () => {
          setAmount("");
          setState({
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            focus: "",
          });
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
        acceptedCards={["visa", "mastercard", "verve"]}
      />

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="amount"
            className="block mb-1 text-xs md:text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <div className="bg-white flex items-center w-full px-3 py-2 border-2 rounded-lg clicked:border-blue-500">
            <TbCurrencyNaira size={30} />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="number"
            className="block mb-1 text-xs md:text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-3 border-2 bg-white rounded-lg focus:outline-none focus:border-blue-500"
            maxLength={19} // Limit to 16 digits with spaces (e.g., "1234 5678 9101 1234")
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-xs md:text-sm font-medium text-gray-700"
          >
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-3 bg-white border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 items-center">
          <div>
            <label
              htmlFor="expiry"
              className="block mb-1 text-xs md:text-sm font-medium text-gray-700"
            >
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={5}
              className="w-full px-3 py-3 border bg-white rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="block mb-1 text-xs md:text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="tel"
              name="cvc"
              placeholder="CVV"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={3}
              className="w-full px-3 py-3 border bg-white rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            {isPending ? <Spinner /> : "Deposit to Wallet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
