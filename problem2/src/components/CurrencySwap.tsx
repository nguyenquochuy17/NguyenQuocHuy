import React, { SyntheticEvent, useEffect, useState } from "react";
import { SelectForm } from "./SelectForm";
const CurrencySwap: React.FC = () => {
  const [data, setData] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState({ price: 0, name: "" });
  const [toCurrency, setToCurrency] = useState({ price: 0, name: "" });
  const [amount, setAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState("N/A");
  const [mockLoading, setMockLoading] = useState(false);

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!fromCurrency.price || !toCurrency.price) {
      return;
    }

    setMockLoading(true);
    const receivedAmount = (
      (amount * toCurrency.price) /
      fromCurrency.price
    ).toFixed(2);

    setTimeout(() => {
      setMockLoading(false);
    }, 1000);

    setReceivedAmount(receivedAmount + " " + toCurrency.name);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetch(
      "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5zU9NApRXwBz59CqFtTXCqgC4W0ATymFK8XPzbQw"
    )
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Convert Currency</h1>
      <form className="max-w-xl mx-auto mt-10" onSubmit={handleOnSubmit}>
        <div className="flex justify-between items-end">
          <SelectForm
            data={data}
            title="From"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          <img
            alt=""
            src="/convert.png"
            className="object-cover h-10 w-10"
            onClick={handleSwap}
          />
          <SelectForm
            data={data}
            title="To"
            currency={toCurrency}
            setCurrency={setToCurrency}
          />
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left mt-5"
          >
            Amount to send
          </label>
          <input
            type="number"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex justify-between mt-5 w-full items-center">
          <div className="font-semibold">
            Result: {!mockLoading && receivedAmount}
          </div>
          <button
            type="submit"
            className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg w-30"
          >
            {mockLoading && (
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
            )}
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default CurrencySwap;
