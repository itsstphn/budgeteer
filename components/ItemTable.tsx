"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface ItemTableProps {
  items: (string | number)[];
  title: string;
  value: string;
}

export default function ItemTable({
  action,
  items,
  title,
  value,
}: ItemTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetType, setTargetType] = useState<string | null>(null);

  function handleAddItemClick(title: string) {
    setIsModalOpen(true);
    setTargetType(title);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
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
        <div>
          <p>Add {value}</p>
        </div>
        <button onClick={handleCloseModal}>close</button>
      </Modal>
    </div>
  );
}
