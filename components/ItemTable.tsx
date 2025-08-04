"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import _ from "lodash";
import { useFormContext } from "@/providers/FormContext";
import { useBudgetSummaryContext } from "@/providers/BudgetSummaryContext";
import { Pencil, Trash2 } from "lucide-react";
import { FormItem } from "./forms/FormItem";
import { FormAddItem } from "./forms/FormAddItem";
import { FormEditItem } from "./forms/FormEditItem";

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

interface ModalState {
  open: boolean;
  actionType: string | null;
}

type RecurringOption = "1st_half" | "2nd_half";

export default function ItemTable({ title, value }: ItemTableProps) {
  const { selectedMonth, selectedWeek } = useFormContext();
  const { setBudgetSummary } = useBudgetSummaryContext();
  const [isModalOpen, setIsModalOpen] = useState<ModalState>({
    open: false,
    actionType: null,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItemID, setEditItemID] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  const [targetType, setTargetType] = useState<string | null>(null);
  const [recurring, setRecurring] = useState<RecurringOption[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  (isAddModalOpen || isEditModalOpen) && console.log("recurring", recurring);

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
    if (selectedMonth && selectedWeek) {
      fetchData();
    }
  }, [
    value,
    selectedMonth,
    selectedWeek,
    isAddModalOpen,
    isEditModalOpen,
    setBudgetSummary,
    shouldRefetch,
  ]);

  function handleAddItemClick(title: string) {
    setIsAddModalOpen(true);
  }

  function handleEditItemClick(itemID: string) {
    setIsEditModalOpen(true);
    setEditItemID(itemID);
  }

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditItemID(null);
    setRecurring([]);
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    url: string,
    method: string
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    delete data["1st_half"];
    delete data["2nd_half"];
    console.log("handleSubmit clicked");

    console.log("data", data);

    try {
      console.log("fetching");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          type: value,
          recurring: recurring,
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

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    await handleSubmit(e, `/api/items/` + editItemID, "PUT");
  }

  async function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    await handleSubmit(e, `/api`, "POST");
  }

  async function handleDeleteItem(itemID: string) {
    try {
      const response = await fetch(`/api/items/` + itemID, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Success");
        handleCloseModal();

        setShouldRefetch(true);
      }
    } catch {
      console.log("Failed");
    }
  }

  const listItems = items.map((item: ItemProps) => {
    return (
      <li
        key={item._id}
        className="group flex w-full px-2 py-2 justify-between"
      >
        <p className="min-w-[120px]">{item.name}</p>
        <p className="min-w-[60px] text-right">
          {Number(item.amount).toLocaleString()}
        </p>
        <div className=" flex gap-2">
          <div
            onClick={() => handleEditItemClick(item._id)}
            className="group-hover:visible cursor-pointer invisible"
          >
            <Pencil size={18} strokeWidth={1.2}></Pencil>
          </div>
          <div
            onClick={() => handleDeleteItem(item._id)}
            className="group-hover:visible  invisible cursor-pointer"
          >
            <Trash2 size={18} strokeWidth={1.2}></Trash2>
          </div>
        </div>
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
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
      >
        <FormAddItem
          value={value}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleAddSubmit}
          setRecurring={setRecurring}
          recurring={recurring}
        ></FormAddItem>
      </Modal>
      <Modal
        targetType={targetType}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
      >
        <FormEditItem
          itemID={editItemID}
          value={value}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleEditSubmit}
          setRecurring={setRecurring}
          recurring={recurring}
        ></FormEditItem>
      </Modal>
    </div>
  );
}
