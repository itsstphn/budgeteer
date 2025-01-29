import ItemTable from "@/components/ItemTable";
import Button from "@/components/ui/Button";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-row p-5 gap-7">
      <section className="w-[20%] max-h-full bg-primary p-5">
        <p className="text-slate-600">
          Still thinking what to put in this section
        </p>
      </section>
      <section className="flex-auto  min-h-10">
        <div className="flex flex-row gap-5">
          <div className="bg-primary w-fit p-2">
            <p>Month</p>
            <form action="">
              <label htmlFor=""></label>
              <select name="month" id="month">
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
            </form>
          </div>
          <div className="bg-primary w-fit p-2">
            <p>Month</p>
            <form action="">
              <label htmlFor=""></label>
              <select name="week" id="week">
                <option value="first_half">1st-2nd</option>
                <option value="second_half">3rd-4th</option>
              </select>
            </form>
          </div>
        </div>

        <div className="flex w-full bg-slate-400 mt-5 p-5">
          <ItemTable
            items={["chu", "chus"]}
            title="Funds"
            value="fund"
          ></ItemTable>
          <ItemTable
            items={["chu", "chus"]}
            title="Expenses"
            value="expense"
          ></ItemTable>
        </div>
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
              <p className="text-right">11,500</p>
            </div>
            <div>
              <p className="text-right">2,000</p>
            </div>
            <div>
              <p className="text-right">9,500</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[20%] max-h-full bg-primary p-5">
        <p className="text-slate-600">
          Still thinking what to put in this section
        </p>
      </section>
    </main>
  );
}
