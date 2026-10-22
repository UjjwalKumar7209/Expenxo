async function postExpense(userId: number, categoryId: number, amount: number, description: string, date: Date) {
    const checkCategory = await expenseCategory.checkCate
    const returning = await expenseRepository.postExpense(userId, categoryId, amount, description, date)
}


export const expenseService = {
    postExpense
}