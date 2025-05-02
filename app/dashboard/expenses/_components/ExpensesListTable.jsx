import { deleteExpense } from "@/actions/actions";
import { Trash } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

export default function ExpensesListTable({ expensesList, refreshData }) {
  async function handleDeleteExpense(expenseId) {
    const result = await deleteExpense(expenseId);

    if (result) {
      refreshData();
      toast.success("Expense deleted");
    } else {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="mt-3 rounded-b-md overflow-hidden">
      <h2 className="font-semibold text-lg mb-2">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 *:font-semibold px-4 rounded-t-md gap-2">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList?.map((expenses, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-4 bg-slate-100 p-2 px-4 gap-2"
          >
            <h2 className="break-all">{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>
              {/* {expenses.createdAt.toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} */}

              {moment(expenses.createdAt).format("D/M/YY")}
            </h2>
            <h2>
              <Trash
                className="text-red-500 cursor-pointer"
                size={20}
                onClick={() => {
                  handleDeleteExpense(expenses.id);
                }}
              />
            </h2>
          </div>
        );
      })}
    </div>
  );
}
