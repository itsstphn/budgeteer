"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BudgetSummary {
  funds: number;
  expenses: number;
}

interface BudgetSummaryContextProps {
  budgetSummary: BudgetSummary;
  setBudgetSummary: (
    summary: BudgetSummary | ((prevSummary: BudgetSummary) => BudgetSummary)
  ) => void;
}

const BudgetSummaryContext = createContext<
  BudgetSummaryContextProps | undefined
>(undefined);

export const BudgetSummaryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary>({
    funds: 0,
    expenses: 0,
  });

  return (
    <BudgetSummaryContext.Provider value={{ budgetSummary, setBudgetSummary }}>
      {children}
    </BudgetSummaryContext.Provider>
  );
};

export const useBudgetSummaryContext = () => {
  const context = useContext(BudgetSummaryContext);
  if (context === undefined) {
    throw new Error(
      "useBudgetSummary must be used within a BudgetSummaryProvider"
    );
  }
  return context;
};
