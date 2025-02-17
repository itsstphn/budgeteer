"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import _ from "lodash";
import { useFormContext } from "@/providers/FormContext";
import { useBudgetSummaryContext } from "@/providers/BudgetSummaryContext";

interface ItemTableProps {
  title: string;
  value: string;
}

interface ItemProps {
  _id: string;
  name: string;
  amount: number;
  type: string;
}

interface Summary {
  totalFunds: number;
  totalExpenses: number;
}

export default function ItemTable({ title, value }: ItemTableProps) {
  const { selectedMonth, selectedWeek } = useFormContext();
  const { setBudgetSummary } = useBudgetSummaryContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [targetType, setTargetType] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api?type=${value}&month=${selectedMonth}&week=${selectedWeek}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        console.log("this result", data);
        setItems(data);

        const summary = data.reduce(
          (acc: Summary, item: ItemProps) => {
            if (item.type === "fund") {
              acc.totalFunds += +item.amount;
            } else if (item.type === "expense") {
              acc.totalExpenses += +item.amount;
            }
            return acc;
          },
          { totalFunds: 0, totalExpenses: 0 }
        );

        if (value === "fund") {
          setBudgetSummary((prevSummary) => ({
            ...prevSummary,
            funds: summary.totalFunds,
          }));
        } else if (value === "expense") {
          setBudgetSummary((prevSummary) => ({
            ...prevSummary,
            expenses: summary.totalExpenses,
          }));
        }
      } catch (e) {
        console.log("Failed to fetch data", e);
      }
    }
    if (!isModalOpen && selectedMonth && selectedWeek) {
      fetchData();
    }
  }, [value, selectedMonth, selectedWeek, isModalOpen, setBudgetSummary]);

  function handleAddItemClick(title: string) {
    setIsModalOpen(true);
    setTargetType(title);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("handleSubmit clicked");

    try {
      console.log("fetching");
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          type: value,
          selectedPeriod: { selectedMonth, selectedWeek },
        }),
      });

      console.log("response", await response.json());

      if (response.ok) {
        console.log("Success");
        handleCloseModal();
      }
    } catch {
      console.log("Failed");
    }
  }

  const listItems = items.map((item: ItemProps) => {
    return (
      <li key={item._id} className="flex w-full px-4 py-2 justify-between">
        <p>{item.name}</p>
        <p>{item.amount}</p>
      </li>
    );
  });

  return (
    <div className="flex-1 w-full p-2 flex flex-col items-center">
      <p className="mb-3">{title}</p>
      <ul className="w-full flex gap-2 flex-col items-center p-4 border-2 border-slate-900 min-h-[400px]">
        {listItems}
        <Button
          action={() => handleAddItemClick(title)}
          text="+ Add Item"
        ></Button>
      </ul>
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
      </Modal>
    </div>
  );
}
