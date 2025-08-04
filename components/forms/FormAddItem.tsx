"use client";

import _ from "lodash";
import { useEffect, useState } from "react";

interface FormAddItemProps {
  value: string;
  handleCloseModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setRecurring: (value: string[]) => void;
  recurring: string[];
}

export function FormAddItem({
  value,
  handleCloseModal,
  handleSubmit,
  setRecurring,
  recurring,
}: FormAddItemProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">Add {_.capitalize(value)}</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="inline-block min-w-[80px]" htmlFor="name">
            Name:{" "}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 px-1"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label className="inline-block min-w-[80px]" htmlFor="amount">
            Amount:{" "}
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="border-2 px-1"
            type="number"
            id="amount"
            name="amount"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Recurring:</p>
          <label className="w-fit" htmlFor="first_half">
            <input
              className="mx-2"
              type="checkbox"
              id="first_half"
              name="first_half"
              checked={recurring.includes("first_half")}
              onChange={(e) => {
                if (e.target.checked) {
                  setRecurring([...recurring, "first_half"]);
                } else {
                  setRecurring(recurring.filter((r) => r !== "first_half"));
                }
              }}
            />
            1st-2nd week
          </label>
          <label className="w-fit" htmlFor="second_half">
            <input
              className="mx-2"
              type="checkbox"
              id="second_half"
              name="second_half"
              checked={recurring.includes("second_half")}
              onChange={(e) => {
                if (e.target.checked) {
                  setRecurring([...recurring, "second_half"]);
                } else {
                  setRecurring(recurring.filter((r) => r !== "second_half"));
                }
              }}
            />
            3rd-4th week
          </label>
        </div>

        {/* {isRecurring && (
            <div>
              <label htmlFor="recurringEvery">Every: </label>
              <select name="recurringEvery" id="recurringEvery">
                <option value="cycle">Cycle</option>
                <option value="first">1st-2nd week</option>
                <option value="second">3rd-4th week</option>
              </select>
            </div>
          )} */}

        <div className="flex gap-2">
          <button className="border-2 px-2 py-1" type="submit">
            Confirm
          </button>
          <button className="border-2 px-2 py-1" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
