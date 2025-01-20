import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-row p-5 gap-7">
      <section className="w-[20%] max-h-full bg-primary p-5">
        Still thinking what to put in this section
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
          <div className="flex-1 w-full p-2 flex flex-col items-center">
            <p className="mb-3">Funds</p>
            <div className="w-full flex gap-2 flex-col items-center p-4 border-2 border-slate-900 min-h-[400px]">
              <div className="flex w-full px-4 py-2 justify-between">
                <p>Salary</p>
                <p>11,000</p>
              </div>
              <div className="border-dashed border-2 mb-2 border-slate-900 py-1 px-2">
                + Add Item
              </div>
            </div>
          </div>
          <div className="flex-1 w-full p-2 flex flex-col items-center">
            <p className="mb-3">Expenses</p>
            <ul className="w-full flex gap-2 flex-col items-center p-4 border-2 border-slate-900 min-h-[400px]">
              <li className="flex w-full px-4 py-2 justify-between">
                <p>Allowance</p>
                <p>2,000</p>
              </li>
              <div className="border-dashed border-2 mb-2 border-slate-900 py-1 px-2">
                + Add Item
              </div>
            </ul>
          </div>
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
      <section className="w-[20%]"></section>
    </main>
  );
}
