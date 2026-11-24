import { categoryRepository } from "../repositories/category.repository";
import { expenseRepository } from "../repositories/expense.repository";
import { getCache, deleteCache, setCache } from "./redis.services";

async function postExpense(
  userId: number,
  category: string,
  categoryId: number,
  amount: number,
  description: string,
  date: Date,
) {
  const checkCategory =
    await categoryRepository.getCategoryByUserIdAndCategoryId(
      userId,
      categoryId,
    );
  if (!checkCategory) {
    throw new Error("This category doesnot exist");
  }
  const returning = await expenseRepository.postExpense(
    userId,
    categoryId,
    amount,
    description,
    date,
  );

  try {
    await deleteCache(`user:${userId}:expenses`);
  } catch (error) {
    console.error("Failed to invalidate expense cache:", error);
  }

  return returning;
}

async function getExpense(userID: number) {
  const cacheKey = `user:${userID}:expenses`;

  try {
    const cachedExpenses = await getCache(cacheKey);
    if (cachedExpenses) {
      console.log("Redis cache hit!");
      return cachedExpenses;
    }
  } catch (error) {
    console.error("Redis cache read failed:", error);
  }
  console.log("Redis cache miss!");

  const expenses = await expenseRepository.getExpense(userID);

  try {
    await setCache(cacheKey, expenses, 300);
  } catch (error) {
    console.error("Redis cache write fail!", error);
  }

  return expenses;
}

async function deleteExpense(userId: number, expenseId: number) {
  const checkExpense = await expenseRepository.getExpenseByExpenseIdAndUserId(
    userId,
    expenseId,
  );
  if (!checkExpense) {
    throw new Error("Expense id not found");
  }
  const returning = await expenseRepository.deleteExpense(userId, expenseId);

  try {
    await deleteCache(`user:${userId}:expenses`);
  } catch (error) {
    console.error("failed to invalidate expenses cache:", error);
  }

  return returning;
}

export const expenseService = {
  postExpense,
  getExpense,
  deleteExpense,
};
