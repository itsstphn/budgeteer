"use client";

import { useBudgetSummaryContext } from "@/providers/BudgetSummaryContext";
import { useEffect, useState } from "react";

export default function FinancialSummary() {
  const { budgetSummary } = useBudgetSummaryContext();
  const [funds, setFunds] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [projectedMoneyLeft, setProjectedMoneyLeft] = useState(0);

  useEffect(() => {
    setFunds(budgetSummary.funds);
    setExpenses(budgetSummary.expenses);
    setProjectedMoneyLeft(budgetSummary.funds - budgetSummary.expenses);
  }, [budgetSummary]);

  return (
    <div className="flex gap-5 mt-5 ">
      <div className="p-2">
        <div>
          <p>Total Funds:</p>
        </div>
        <div>
          <p>Total Expenses:</p>
        </div>
        <div>
          <p>Projected Money Left:</p>
        </div>
      </div>
      <div className="bg-slate-400 p-2 min-w-[150px]">
        <div className="">
          <p className="text-right">{funds}</p>
        </div>
        <div>
          <p className="text-right">{expenses}</p>
        </div>
        <div>
          <p className="text-right">{projectedMoneyLeft}</p>
        </div>
      </div>
    </div>
  );
}
