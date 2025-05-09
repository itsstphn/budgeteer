import ItemTable from "@/components/ItemTable";
import MonthPicker from "@/components/MonthPicker";
import Button from "@/components/ui/Button";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import WeekPicker from "./../components/WeekPicker";
import FinancialSummary from "./../components/FinancialSummary";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  console.log("session", session);
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="container flex flex-row p-5 gap-7">
      <section className="w-[20%] max-h-full bg-primary p-5">
        <p className="text-slate-600">
          Still thinking what to put in this section
        </p>
      </section>
      <section className="flex-auto min-h-10">
        <div className="flex flex-row gap-5">
          <MonthPicker></MonthPicker>
          <WeekPicker></WeekPicker>
        </div>

        <div className="flex w-full bg-slate-400 mt-5 p-5">
          <ItemTable title="Funds" value="fund"></ItemTable>
          <ItemTable title="Expenses" value="expense"></ItemTable>
        </div>
        <FinancialSummary></FinancialSummary>
      </section>
      <section className="w-[20%] max-h-full bg-primary p-5">
        <p className="text-slate-600">
          Still thinking what to put in this section
        </p>
      </section>
    </main>
  );
}
