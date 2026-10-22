import type { Request, Response } from "express";
import { expenseService } from "../services/expense.services";

async function postExpense(req: Request, res: Response) {
    try {
        const { categoryId, expense, amount, description, date } = req.body
        const userId = req.user!.userId
        const returning = await expenseService.postExpense(userId, categoryId, amount, description, date)
        res.status(200).json(returning)
    } catch (error) {
        res.status(500).json({
            msg: error instanceof Error? error.message: "Something went while posting your expense"
        })
    }
}

export const expenseController = {
    postExpense
}