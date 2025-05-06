import Link from "next/link";

export default function BudgetItem({ budget }) {
  function calculateProgressPercentage() {
    const percantage = ((budget.totalSpend / budget.amount) * 100).toFixed(2);

    if (percantage > 100) {
      return 100;
    }
    return percantage;
  }

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="p-5 rounded-md border space-y-4 hover:shadow-md cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 text-xl bg-slate-100 rounded-full">
              {budget.icon}
            </div>
            <div>
              <h2 className="font-semibold">{budget.name}</h2>
              <h2 className="text-gray-500 text-sm">{budget.totalItem} Item</h2>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-indigo-600 font-bold">
              ${budget.amount}
            </h2>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className=" text-slate-500 text-sm">
              ${budget.totalSpend ? budget.totalSpend : "0"} Spend
            </h2>
            <h2 className=" text-slate-500 text-sm">
              $
              {budget.amount - budget.totalSpend < 0
                ? 0
                : budget.amount - budget.totalSpend}{" "}
              Remaining
            </h2>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full">
            <div
              style={{
                width: `${calculateProgressPercentage()}%`,
              }}
              className="h-2 bg-indigo-600 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
