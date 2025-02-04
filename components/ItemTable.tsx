"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import _ from "lodash";

interface ItemTableProps {
  items: (string | number)[];
  title: string;
  value: string;
}

export default function ItemTable({ items, title, value }: ItemTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetType, setTargetType] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);

  function handleAddItemClick(title: string) {
    setIsModalOpen(true);
    setTargetType(title);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log({ ...data, targetType: value });
  }

  return (
    <div className="flex-1 w-full p-2 flex flex-col items-center">
      <p className="mb-3">{title}</p>
      <div className="w-full flex gap-2 flex-col items-center p-4 border-2 border-slate-900 min-h-[400px]">
        <div className="flex w-full px-4 py-2 justify-between">
          <p>Salary</p>
          <p>11,000</p>
        </div>
        <Button
          action={() => handleAddItemClick(title)}
          text="+ Add Item"
        ></Button>
      </div>
      <Modal
        targetType={targetType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center">Add {_.capitalize(value)}</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="inline-block min-w-[80px]" htmlFor="name">
                Name:{" "}
              </label>
              <input
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
                className="border-2 px-1"
                type="number"
                id="amount"
                name="amount"
              />
            </div>
            <label htmlFor="recurring">
              <input
                className="mx-2"
                type="checkbox"
                id="recurring"
                name="recurring"
                onChange={() => setIsRecurring(!isRecurring)}
              />
              Recurring
            </label>
            {isRecurring && (
              <div>
                <label htmlFor="recurringEvery">Every: </label>
                <select name="recurringEvery" id="recurringEvery">
                  <option value="cycle">Cycle</option>
                  <option value="first">1st-2nd week</option>
                  <option value="second">3rd-4th week</option>
                </select>
              </div>
            )}

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
      </Modal>
    </div>
  );
}
