import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { expenseTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);

async function postExpense(userId: number, categoryId: number, amount: number, description: string, date: Date) {
    const [expense] = await db.insert(expenseTable).values({
        userId: userId,
        amount: amount,
        categoryId: categoryId,
        date: date,
        description: description
    }).returning()
    return expense;
}

async function getExpenseByExpenseIdAndUserId(userId: number, expenseId: number) {
    const data = await db.select().from(expenseTable).where(and(
        eq(expenseTable.userId, userId),
        eq(expenseTable.id, expenseId)
    ))
    return data[0] ?? null
}

async function getExpense(userId: number) {
    const expenses = await db.select().from(expenseTable).where(eq(expenseTable.userId, userId))
    return expenses
}

async function deleteExpense(userId: number, expenseId: number) {
    const returning = db.delete(expenseTable).where(and(
        eq(expenseTable.userId, userId),
        eq(expenseTable.id, expenseId)
    ))
    return returning
}

export const expenseRepository = {
    postExpense,
    getExpense,
    getExpenseByExpenseIdAndUserId,
    deleteExpense
}