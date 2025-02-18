"use client";

import _ from "lodash";

interface FormAddItemProps {
  value: string;
  handleCloseModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsRecurring: (value: boolean) => void;
  isRecurring: boolean;
}

export function FormItem({
  value,
  handleCloseModal,
  handleSubmit,
  setIsRecurring,
  isRecurring,
}: FormAddItemProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">Add {_.capitalize(value)}</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="inline-block min-w-[80px]" htmlFor="name">
            Name:{" "}
          </label>
          <input className="border-2 px-1" type="text" id="name" name="name" />
        </div>
        <div>
          <label className="inline-block min-w-[80px]" htmlFor="amount">
            Amount:{" "}
          </label>
          <input
            className="border-2 px-1"
            type="number"
            id="amount"
            name="amount"
          />
        </div>
        <label className="w-fit" htmlFor="recurring">
          <input
            className="mx-2"
            type="checkbox"
            id="recurring"
            name="recurring"
            onChange={() => setIsRecurring(!isRecurring)}
          />
          Recurring
        </label>
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
