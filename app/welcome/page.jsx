export default function Welcome() {
  return (
    <div className="p-10 h-[100vh] flex flex-col">
      <div className="h-48 grid place-items-center flex-1">
        <h1 className="text-center font-bold text-xl">welcome to budgeteer!</h1>
      </div>
      <div className="flex flex-col items-center gap-5 flex-1">
        <label className="flex items-center flex-col">
          <span className="font-bold"> please enter starting budget:</span>
          <input
            className="px-2 py-1 text-black border-2 border-gray-900"
            type="text"
          />
        </label>
        <label className="flex items-center flex-col">
          <span className="font-bold">source of funds:</span>
          <input
            className="px-2 py-1 text-black border-2 border-gray-900"
            type="text"
            placeholder="e.g. Salary"
          />
        </label>
        <button className="mt-2 px-5 py-2 border-2 border-gray-950">
          Confirm
        </button>
      </div>
    </div>
  );
}
