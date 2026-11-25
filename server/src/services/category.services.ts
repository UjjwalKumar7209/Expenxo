import { categoryRepository } from "../repositories/category.repository";
import { expenseRepository } from "../repositories/expense.repository";
import { getCache, setCache, deleteCache } from "./redis.services";

async function getCategories(userId: number) {
  const cacheKey = `user:${userId}:categories`;
  try {
    const cachedCategories = await getCache(cacheKey);
    if (cachedCategories) {
      console.log("Redis hit!");
      return cachedCategories;
    }
  } catch (error) {
    console.error("Redis cache read failed:", error);
  }
  console.log("Redis miss!");
  const categories = await categoryRepository.getCategoryByUserId(userId);
  try {
    await setCache(cacheKey, categories, 600);
  } catch (error) {
    console.error("Redis cache write fail!", error);
  }
  return categories;
}

async function postCategory(userId: number, category: string) {
  const data = await categoryRepository.getCategoryByUserIdAndName(
    userId,
    category,
  );
  // console.log(data)
  if (data) {
    throw new Error("Category already exists!");
  }
  const returning = await categoryRepository.postCategory(userId, category);

  try {
    await deleteCache(`user:${userId}:categories`);
  } catch (error) {
    console.error("Failed to invalidate expense cache:", error);
  }

  return returning;
}

async function deleteCategory(userId: number, category: string) {
  const data = await categoryRepository.getCategoryByUserIdAndName(
    userId,
    category,
  );
  // console.log(data)
  if (!data) {
    throw new Error("Category doesnot exists!");
  }
  const expenses = await expenseRepository.getExpensesByCategoryId(
    userId,
    data.id,
  );
  if (expenses.length > 0) {
    throw new Error(
      "Cannot delete category because expenses are associated with it.",
    );
  }
  const returning = await categoryRepository.deleteCategoryByName(
    userId,
    category,
  );

  try {
    await deleteCache(`user:${userId}:categories`);
  } catch (error) {
    console.error("Failed to invalidate expense cache:", error);
  }

  return returning;
}

async function updateCategory(
  userId: number,
  categoryId: number,
  updatedCategory: string,
) {
  const checkCategory =
    await categoryRepository.getCategoryByUserIdAndCategoryId(
      userId,
      categoryId,
    );
  if (!checkCategory) {
    throw new Error("Category not found to update");
  }
  const returning = await categoryRepository.updateCategory(
    userId,
    categoryId,
    updatedCategory,
  );

  try {
    await deleteCache(`user:${userId}:categories`);
  } catch (error) {
    console.error("Failed to invalidate expense cache:", error);
  }

  return returning;
}

export const categoryService = {
  getCategories,
  postCategory,
  deleteCategory,
  updateCategory,
};
