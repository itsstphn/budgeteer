export default function MonthPicker() {
  return (
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
  );
}
