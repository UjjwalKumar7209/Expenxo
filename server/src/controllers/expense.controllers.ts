import type { Request, Response } from "express";
import { expenseService } from "../services/expense.services";

async function postExpense(req: Request, res: Response) {
    try {
        const { categoryId, category, amount, description } = req.body
        const date = new Date(req.body.date);
        const userId = req.user!.userId
        const returning = await expenseService.postExpense(userId, category, categoryId, amount, description, date)
        res.status(200).json({
            msg: "Expense added",
            returning: returning
        })
    } catch (error) {
        res.status(500).json({
            msg: error instanceof Error? error.message: "Something went while posting your expense"
        })
    }
}

export const expenseController = {
    postExpense
}