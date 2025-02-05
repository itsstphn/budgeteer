"use client";

import { useFormContext } from "@/providers/FormContext";
import { useEffect, useState } from "react";

export default function WeekPicker() {
  const { setSelectedWeek, selectedWeek } = useFormContext();

  const [selectedWeekForm, setSelectedWeekForm] = useState<string>("");

  useEffect(() => {
    setSelectedWeekForm(selectedWeek);
  }, [selectedWeek]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(e.target.value);
    console.log("target", e.target.value);
  };

  return (
    <div className="bg-primary w-fit p-2">
      <p>Week</p>
      <form action="">
        <label htmlFor=""></label>
        <select
          value={selectedWeekForm}
          onChange={handleChange}
          name="week"
          id="week"
        >
          <option value="first_half">1st-2nd</option>
          <option value="second_half">3rd-4th</option>
        </select>
      </form>
    </div>
  );
}
