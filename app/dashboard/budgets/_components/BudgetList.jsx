"use client";

import { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getBudgetList } from "@/actions/actions";
import BudgetItem from "./BudgetItem";

export default function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function checkBudgetList() {
    try {
      setIsLoading(true);
      const result = await getBudgetList();

      if (result) {
        setBudgetList(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkBudgetList();
  }, []);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <CreateBudget refreshData={checkBudgetList} />

        {isLoading ? (
          [1, 2, 3, 4].map((index) => {
            return (
              <div
                key={index}
                className="w-full bg-slate-100 rounded-md h-[140px] animate-pulse"
              ></div>
            );
          })
        ) : budgetList?.length > 0 ? (
          budgetList.map((budget, index) => {
            return <BudgetItem budget={budget} key={index} />;
          })
        ) : (
          <div className="text-gray-500 text-lg text-center flex items-center justify-center">No Budget Yet</div>
        )}
      </div>
    </div>
  );
}
