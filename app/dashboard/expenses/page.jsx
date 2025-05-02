"use client";

import { getAllExpensesList } from "@/actions/actions";
import ExpensesListTable from "./_components/ExpensesListTable";
import { useEffect, useState } from "react";

export default function MyExpenses() {
  const [allExpensesList, setAllExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function checkAllExpensesList() {
    try {
      setIsLoading(true);
      const result = await getAllExpensesList();

      if (result) {
        setAllExpensesList(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAllExpensesList();
  }, []);
  return (
    <div className="sm:p-10 p-5">
      <h1 className="text-2xl font-bold">My Expenses</h1>

      {isLoading ? (
        <>
          <div className="w-38 bg-slate-100 rounded-md h-[30px] animate-pulse mt-3"></div>
          <div className="w-full bg-slate-100 rounded-md h-[140px] animate-pulse mt-3">
            {" "}
          </div>
        </>
      ) : allExpensesList.length > 0 ? (
        <ExpensesListTable
          expensesList={allExpensesList}
          refreshData={checkAllExpensesList}
        />
      ) : (
        <div className=" text-gray-500 mt-3 text-lg">No Expenses Yet</div>
      )}
    </div>
  );
}
