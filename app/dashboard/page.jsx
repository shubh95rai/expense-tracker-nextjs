"use client";

import { getAllExpensesList, getBudgetList } from "@/actions/actions";
import { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BudgetItem from "./budgets/_components/BudgetItem";
import dynamic from "next/dynamic";
import ExpensesListTable from "./expenses/_components/ExpensesListTable";
import { useRouter } from "next/navigation";
const BarChartDashboard = dynamic(
  () => import("./_components/BarChartDashboard"),
  { ssr: false }
);

export default function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [allExpensesList, setAllExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function checkBudgetList() {
    try {
      setIsLoading(true);
      const result = await getBudgetList();

      if (result.length > 0) {
        setBudgetList(result);
        checkAllExpensesList();
      } else {
        router.push("/dashboard/budgets");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkAllExpensesList() {
    const result = await getAllExpensesList();

    if (result) {
      setAllExpensesList(result);
    }
  }

  useEffect(() => {
    checkBudgetList();
  }, []);

  return (
    <div className="sm:p-10 p-5">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <CardInfo budgetList={budgetList} />

      <div className="mt-5 grid grid-cols-1 gap-5  lg:grid-cols-3">
        <div className="lg:col-span-2">
          {budgetList.length > 0 && (
            <BarChartDashboard budgetList={budgetList} />
          )}

          {allExpensesList.length > 0 && (
            <ExpensesListTable
              expensesList={allExpensesList}
              refreshData={checkBudgetList}
            />
          )}
        </div>

        <div>
          {budgetList.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-2">Latest Budgets</h2>
              <div className="grid gap-5">
                {budgetList?.map((budgetItem, index) => {
                  return <BudgetItem budget={budgetItem} key={index} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
