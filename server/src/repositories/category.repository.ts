import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import { categoryTable } from '../db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);

async function getCategoryByUserId(userId: number) {
    const categories = await db.select().from(categoryTable).where(eq(categoryTable.userId, userId))

    return categories
}

async function getCategoryByUserIdAndName(userId: number, name: string) {
    const data = await db.select().from(categoryTable).where(and(
        eq(categoryTable.userId, userId),
        eq(categoryTable.name, name)
    ))
    console.log(data)
    return data[0] ?? null
}

async function postCategory(userId: number, category: string) {
    return await db.insert(categoryTable).values({
        userId: userId,
        name: category
    })
}

async function deleteCategoryByName(userId: number, category: string) {
    return await db.delete(categoryTable).where(and(
        eq(categoryTable.userId, userId),
        eq(categoryTable.name, category)
    )).returning()
}

async function updateCategory(userId: number, category: string, updatedCategory: string) {
    const data = await db.update(categoryTable).set({
        name: updatedCategory,
    }).where(and(
        eq(categoryTable.userId, userId),
        eq(categoryTable.name, category)
    )).returning()
    return data[0]
}


export const categoryRepository = {
    getCategoryByUserId,
    getCategoryByUserIdAndName,
    postCategory,
    deleteCategoryByName,
    updateCategory
}