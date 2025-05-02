"use client";

import {
  deleteBudget,
  getBudgetInfo,
  getExpensesList,
} from "@/actions/actions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpensesListTable from "../_components/ExpensesListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

export default function Expeneses() {
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const router = useRouter();

  async function checkBudgetInfo() {
    try {
      setIsLoading(true);
      const result = await getBudgetInfo(id);

      if (result) {
        setBudgetInfo(result[0]);
        checkExpensesList(id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkExpensesList(budgetId) {
    const result = await getExpensesList(budgetId);

    if (result) {
      setExpensesList(result);
    }
  }

  async function handleDeleteBudget(budgetId) {
    const result = await deleteBudget(budgetId);

    if (result) {
      toast.success("Budget deleted");
      router.push("/dashboard/budgets");
    } else {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    checkBudgetInfo();
  }, []);

  return (
    <div className="sm:p-10 p-5">
      <h2 className="text-2xl font-bold flex items-center justify-between">
        <span className="flex items-center gap-2">
          {/* <ArrowLeft className="cursor-pointer" onClick={() => router.back()} /> */}
          Expenses
        </span>

        <div className="flex items-center gap-2">
          <EditBudget budgetInfo={budgetInfo} refreshData={checkBudgetInfo} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => {
                    handleDeleteBudget(id);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 items-start">
        {isLoading ? (
          <div className="w-full bg-slate-100 rounded-md h-[140px] animate-pulse">
            {" "}
          </div>
        ) : budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="text-gray-600 h-[140px] flex items-center justify-center text-lg">
            {" "}
            No Expenses Yet
          </div>
        )}

        <AddExpense budgetId={id} refreshData={checkBudgetInfo} />
      </div>

      {expensesList?.length > 0 ? (
        <div className="mt-5">
          <ExpensesListTable
            expensesList={expensesList}
            refreshData={checkBudgetInfo}
          />
        </div>
      ) : null}
    </div>
  );
}
