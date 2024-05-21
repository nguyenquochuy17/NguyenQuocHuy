import React, { Dispatch, SetStateAction } from "react";

export const SelectForm: React.FC<{
  data: Record<string, number>;
  title: string;
  currency: { price: number; name: string };
  setCurrency: Dispatch<SetStateAction<{ price: number; name: string }>>;
}> = ({ data, title, currency, setCurrency }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        {title}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setCurrency({
            price: parseFloat(e.target.value),
            name: e.target.options[e.target.selectedIndex].text,
          });
        }}
        value={currency.price.toString()}
        required
      >
        <option value="">Select a currency</option>
        {Object.keys(data).map((currency) => (
          <option value={data[currency]}>{currency}</option>
        ))}
      </select>
    </div>
  );
};
