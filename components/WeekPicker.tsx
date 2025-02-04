export default function WeekPicker() {
  return (
    <div className="bg-primary w-fit p-2">
      <p>Week</p>
      <form action="">
        <label htmlFor=""></label>
        <select name="week" id="week">
          <option value="first_half">1st-2nd</option>
          <option value="second_half">3rd-4th</option>
        </select>
      </form>
    </div>
  );
}
