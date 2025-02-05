"use client";

import { getCurrentMonth, getCurrentWeek } from "@/lib/date";

import { createContext, useContext, useEffect, useState } from "react";

interface FormContextProps {
  selectedMonth: string;
  selectedWeek: string;
  setSelectedMonth: (month: string) => void;
  setSelectedWeek: (week: string) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  useEffect(() => {
    const month = getCurrentMonth();
    const week = getCurrentWeek();

    setSelectedMonth(month);
    setSelectedWeek(week);
  }, []);

  return (
    <FormContext.Provider
      value={{ selectedMonth, selectedWeek, setSelectedMonth, setSelectedWeek }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
