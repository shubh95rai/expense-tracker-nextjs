"use server";

import { db } from "@/db/drizzle";
import { budgets, expenses } from "@/db/schema";
import { asc, desc, eq, getTableColumns, sql } from "drizzle-orm";

export async function getBudgets() {
  try {
    const result = await db.select().from(budgets);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createBudget(name, amount) {
  try {
    const result = await db
      .insert(budgets)
      .values({ name, amount })
      .returning({ insertedId: budgets.id });

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getBudgetList() {
  try {
    const result = await db
      .select({
        ...getTableColumns(budgets),
        totalSpend: sql`sum(${expenses.amount})`,
        totalItem: sql`count(${expenses.id})`,
      })
      .from(budgets)
      .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
      .groupBy(budgets.id)
      .orderBy(asc(budgets.createdAt));

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getBudgetInfo(paramsId) {
  try {
    const result = await db
      .select({
        ...getTableColumns(budgets),
        totalSpend: sql`sum(${expenses.amount})`,
        totalItem: sql`count(${expenses.id})`,
      })
      .from(budgets)
      .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
      .where(eq(budgets.id, paramsId))
      .groupBy(budgets.id);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addExpense(budgetId, name, amount) {
  try {
    const result = await db
      .insert(expenses)
      .values({ name, amount, budgetId })
      .returning({ insertedId: expenses.id });

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getExpensesList(budgetId) {
  try {
    const result = await db
      .select()
      .from(expenses)
      .where(eq(expenses.budgetId, budgetId))
      .orderBy(desc(expenses.createdAt));

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAllExpensesList() {
  try {
    const result = await db
      .select({
        ...getTableColumns(expenses),
      })
      .from(budgets)
      .innerJoin(expenses, eq(budgets.id, expenses.budgetId))
      .orderBy(desc(expenses.createdAt));

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteExpense(expenseId) {
  try {
    const result = await db
      .delete(expenses)
      .where(eq(expenses.id, expenseId))
      .returning();

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteBudget(budgetId) {
  try {
    const result = await db
      .delete(budgets)
      .where(eq(budgets.id, budgetId))
      .returning();

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateBudget(budgetId, name, amount) {
  try {
    const result = await db
      .update(budgets)
      .set({ name, amount })
      .where(eq(budgets.id, budgetId))
      .returning();

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
