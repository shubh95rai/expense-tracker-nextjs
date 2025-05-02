"use client";

import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  function calculateCardInfo() {
    let totalBudget = 0;
    let totalSpend = 0;

    budgetList.forEach((budget) => {
      totalBudget += +budget.amount;
      totalSpend += +budget.totalSpend;
    });

    setTotalBudget(totalBudget);
    setTotalSpend(totalSpend);
  }

  useEffect(() => {
    calculateCardInfo();
  }, [budgetList]);

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {budgetList?.length > 0 ? (
        <>
          <div className="p-7 border rounded-md flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="p-3 size-12 rounded-full bg-indigo-600 text-white" />
          </div>

          <div className="p-7 border rounded-md flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpend}</h2>
            </div>
            <ReceiptText className="p-3 size-12 rounded-full bg-indigo-600 text-white" />
          </div>

          <div className="p-7 border rounded-md flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="p-3 size-12 rounded-full bg-indigo-600 text-white" />
          </div>
        </>
      ) : (
        [1, 2, 3].map((index) => {
          return (
            <div
              key={index}
              className="w-full bg-slate-100 rounded-md h-[110px] animate-pulse"
            ></div>
          );
        })
      )}
    </div>
  );
}
