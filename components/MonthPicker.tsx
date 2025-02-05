"use client";
import { useFormContext } from "@/providers/FormContext";
import { useEffect, useState } from "react";

export default function MonthPicker() {
  const { setSelectedMonth, selectedMonth } = useFormContext();

  const [selectedMonthForm, setSelectedMonthForm] = useState<string>("");

  useEffect(() => {
    setSelectedMonthForm(selectedMonth);
  }, [selectedMonth]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    console.log("target", e.target.value);
  };

  return (
    <div className="bg-primary min-w-[121px] w-fit p-2">
      <p>Month</p>
      <form action="">
        <label htmlFor=""></label>
        {selectedMonth ? (
          <select
            value={selectedMonthForm}
            onChange={handleChange}
            name="month"
            id="month"
          >
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
            <option value="apr">April</option>
            <option value="may">May</option>
            <option value="jun">June</option>
            <option value="jul">July</option>
            <option value="aug">August</option>
            <option value="sep">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
        ) : (
          <p>Loading...</p>
        )}
      </form>
    </div>
  );
}
