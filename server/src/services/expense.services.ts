import { categoryRepository } from "../repositories/category.repository"
import { expenseRepository } from "../repositories/expense.repository"

async function postExpense(userId: number, category: string, categoryId: number, amount: number, description: string, date: Date) {
    const checkCategory = await categoryRepository.getCategoryByUserIdAndCategoryId(userId, categoryId)
    if (!checkCategory) {
        throw new Error("This category doesnot exist")
    }
    const returning = await expenseRepository.postExpense(userId, categoryId, amount, description, date)
    return returning
}

async function getExpense(userID: number) {
    const expenses = await expenseRepository.getExpense(userID);
    return expenses
}


export const expenseService = {
    postExpense,
    getExpense
}