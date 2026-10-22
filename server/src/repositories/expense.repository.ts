import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
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

export const expenseRepository = {
    postExpense
}