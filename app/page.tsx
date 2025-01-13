import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-row p-5">
      <section className="w-[25%]">Hollwida</section>
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

        <div></div>
      </section>
      <section className="w-[25%]"></section>
    </main>
  );
}
