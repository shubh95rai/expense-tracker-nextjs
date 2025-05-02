import BudgetList from "./_components/BudgetList";

export default function Budgets() {
  return (
    <div className="sm:p-10 p-5">
      <h2 className="text-2xl font-bold">My Budgets</h2>
      <BudgetList />
    </div>
  )
}