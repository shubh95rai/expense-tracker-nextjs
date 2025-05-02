"use client";

import { addExpense } from "@/actions/actions";
import LoadingButton from "@/app/_components/LoadingButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddExpense() {
    if (!name || !amount || amount <= 0) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    const result = await addExpense(budgetId, name, amount);

    if (result) {
      refreshData();
      setLoading(false);
      setName("");
      setAmount("");
      toast.success("New expense added");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="p-5 border rounded-md">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <div className="mt-4 space-y-4">
        <div>
          <h2 className="font-medium mb-1 text-black">Expense name</h2>
          <Input
            placeholder="e.g. Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h2 className="font-medium mb-1 text-black">Expense amount</h2>
          <Input
            placeholder="e.g. 100$"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <LoadingButton pending={loading} handleClick={handleAddExpense}>
          Add Expense
        </LoadingButton>
      </div>
    </div>
  );
}
