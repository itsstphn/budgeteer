"use client";

import Button from "./ui/Button";

interface ItemTableProps {
  items: (string | number)[];
  title: string;
}

function handleAddItemClick() {
  console.log("Add Item clicked");
}

export default function ItemTable({ action, items, title }: ItemTableProps) {
  return (
    <div className="flex-1 w-full p-2 flex flex-col items-center">
      <p className="mb-3">{title}</p>
      <div className="w-full flex gap-2 flex-col items-center p-4 border-2 border-slate-900 min-h-[400px]">
        <div className="flex w-full px-4 py-2 justify-between">
          <p>Salary</p>
          <p>11,000</p>
        </div>
        <Button action={handleAddItemClick} text="+ Add Item"></Button>
      </div>
    </div>
  );
}
